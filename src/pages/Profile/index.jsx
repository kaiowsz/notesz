import { Container, Form, Avatar } from "./style";
import {FiArrowLeft, FiCamera, FiLock, FiMail, FiUser} from 'react-icons/fi'
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import avatarPlaceHolder from "../../assets/userprofileimage_64px.png"
import ButtonText from "../../components/ButtonText";

import {api} from "../../services/api"

import Input from "../../components/Input"
import { useState } from "react";

export default function Profile() {

    const {user, updateProfile } = useAuth()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [passwordNew, setPasswordNew] = useState()

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder


    const [avatar, setAvatar] = useState(avatarUrl)
    const [avatarFile, setAvatarFile] = useState(null)

    const navigate = useNavigate()
    function handleBack() {
        navigate(-1)
    }

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld, 
        }

        const userUpdated = Object.assign(user, updated)
        
        // return console.log(userUpdated)
        await updateProfile({user: userUpdated, avatarFile})
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);
        
        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft/>
                </button>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} 
                    alt="Foto do usuário"></img>

                    <label htmlFor="avatar">
                        <FiCamera/>

                        <input 
                        id="avatar" 
                        type="file"
                        onChange={handleChangeAvatar}
                        />

                    </label>
                </Avatar>
            <Input placeholder="Nome" 
            type="text" 
            icon={FiUser}
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            />

            <Input placeholder="E-mail" 
            type="email" 
            icon={FiMail}
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}/>

            <Input placeholder="Senha atual"
            type="password" 
            icon={FiLock}
            onChange={(e) => {setPasswordOld(e.target.value)}}/>

            <Input placeholder="Nova senha"
            type="password" 
            icon={FiLock}
            onChange={(e) => {setPasswordNew(e.target.value)}}/>

            <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}