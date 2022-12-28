import { Container, Brand, Menu, Search, Content, NewNote } from "./style"
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from "react"


import Header from "../../components/Header"
import ButtonText from "../../components/ButtonText"
import Input from "../../components/Input"
import Section from "../../components/Section"
import Note from "../../components/Note"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export default function Home() {

    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [notes, setNotes] = useState([])

    const navigate = useNavigate()

    function handleTagSelected(tagName) {
        if(tagName === "all") {
            return setTagsSelected([])
        }
        console.log(tagName)
        const alreadySelected = tagsSelected.includes(tagName)

        if(alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName])
        }

    }

    function handleDetails(id) {
        navigate(`/details/${id}`)
    }

    
    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags()
    }, [])

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fetchNotes()
    }, [tagsSelected, search])

    return (
        <Container>
            <Brand>
                <h1>Notesz</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>

                <ButtonText 
                title="Todos" 
                isActive={tagsSelected.length === 0}
                onClick={() => handleTagSelected("all")}
                />

                </li>
                {
                    tags && tags.map(tag => (
                        <li>
                            <ButtonText
                            key={String(tag.id)}
                            title={tag.name}
                            onClick={() => handleTagSelected(tag.name)} 
                            isActive={tagsSelected.includes(tag.name)}/>
                        </li>
                ))
                }
            </Menu>
    
            <Search>
                <Input 
                placeholder="Pesquisar pelo título" 
                icon={FiSearch}
                onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title='Minhas notas'>
                    {
                        notes.map(note => (
                        <Note 
                        data={note}
                        onClick={() => handleDetails(note.id)}
                        key={String(note.id)}/>
                    )) 
                    
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar Nota               
            </NewNote>
        </Container>
    )

}