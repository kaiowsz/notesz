import { Container, Form } from "./style"
import Header from "../../components/Header"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import NoteItem from "../../components/NoteItem"
import Section from "../../components/Section"
import Button from "../../components/Button"
import ButtonText from "../../components/ButtonText"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { api } from "../../services/api"

export default function New() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()

    function handleAddLink() {

        if (newLink.trim() === "") {
            return alert("Preencha o campo corretamente.") 
        }

        setLinks(prevState => [...prevState, newLink])
        setNewLink("");
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag =>
            tag !== deleted
        ))
    }

    function handleBack() {
        navigate(-1)
    }

    async function handleNewNote() {

        if(title.trim() === "" || !title) {
            return alert("Digite o título da nota.")
        }

        if(newTag) {
            return alert("Você deixou uma tag para adicionar. Verifique antes de prosseguir.")
        }

        if(newLink) {
            return alert("Você deixou um link para adicionar. Verifique antes de prosseguir.")
        }


        await api.post("/notes", {
            title,
            description,
            tags,
            links,
        })
        alert("Nota criada com sucesso.")
        navigate(-1)
    }

    return (
        <Container>
            <Header/>

            <main>
                <Form>
                <header>
                    <h1>Criar nota</h1>
                    <ButtonText 
                    title="Voltar" 
                    onClick={handleBack}/>
                </header>

                <Input 
                placeholder="Título (obrigatório)"
                onChange={e => setTitle(e.target.value)}
                />

                <Textarea
                placeholder="Observações"
                onChange={e => setDescription(e.target.value)}
                />

                <Section title="Links úteis">

                    {
                        links.map((link, index) => (
                            <NoteItem
                            key={String(index)}
                            value={link}
                            onClick={() => handleRemoveLink(link)}
                            />
                        ))
                    }

                    <NoteItem 
                    isNew 
                    placeholder="Novo link"
                    value={newLink}
                    onChange={e => setNewLink(e.target.value)}
                    onClick={handleAddLink}/>

                </Section>

                <Section title="Marcadores">
                    <div className="tags">
                        {
                            tags.map((tag, index) => (
                                <NoteItem
                                key={String(index)}
                                value={tag}
                                onClick={() => handleRemoveTag(tag)}
                                />
                            ))
                        }

                        <NoteItem 
                        isNew 
                        placeholder="Nova Tag"
                        onChange={e => setNewTag(e.target.value)}
                        value={newTag}
                        onClick={handleAddTag}
                        />
                    </div>
                </Section>

                <Button 
                title="Salvar"
                onClick={handleNewNote}
                />
                </Form>
            </main>
        </Container>
    )
}