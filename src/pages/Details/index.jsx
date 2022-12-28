import { Container, Links, Content } from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Button from "../../components/Button"
import Header from "../../components/Header";
import Section from "../../components/Section";
import Tag from "../../components/Tag";
import ButtonText from "../../components/ButtonText";

import { api } from "../../services/api";

export default function Details() {

    const [data, setData] = useState(null);


    const params = useParams()
    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }

    async function handleRemove() {
        const confirm = window.confirm("Tem certeza de que deseja remover a nota?")
        if (confirm) {
            await api.delete(`/notes/${params.id}`)
            handleBack()
        }
    }

    useEffect(() => {
        async function fetchNote() {
            const response = await api.get(`/notes/${params.id}`)
            setData(response.data)
        }
        fetchNote()
    }, [])

    return (
        <Container>
            <Header/>

            {
            data &&
            <main>
                <Content>
                <ButtonText 
                title="Excluir nota"
                onClick={handleRemove}
                />

                <h1>
                    {data.title}
                </h1>

                <p>
                    {data.description}
                </p>

                {
                    data.links &&
                    <Section title="Links">
                        <Links>
                        {
                            data.links.map(link => (
                            <li key={String(link.id)}>
                                <a href={link.url} target="_blank">{link.url}</a>
                            </li>
                            ))
                        }
                        </Links>
                    </Section>
                }

                {
                    data.tags &&
                    <Section title="Mark Ups">
                    {
                        data.tags.map(tag => (
                        <Tag
                        key={String(tag.id)}
                        title={tag.name}
                        />
                        ))
                    }
                    </Section>
                }

                <Button 
                title="Voltar" 
                loading={false}
                onClick={handleBack}
                />

                </Content>
            </main>
            }
                
        </Container>
    )
}