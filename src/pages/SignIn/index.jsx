import {FiLogIn, FiMail, FiLock} from "react-icons/fi"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Link } from "react-router-dom";
import { Container, Form, Background } from "./style";

import { useAuth } from "../../hooks/auth"
import { useState } from "react";

export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn } = useAuth()

    function handleSignIn() {
        signIn({email, password})
    }

    return (
    <Container>
            <Form>
                <h1>Notesz</h1>
                <p>Salve e gerencie suas anotações mais importantes.</p>

                <h2>Faça login</h2>

                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    onChange={event => setEmail(event.target.value)} />
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={event => setPassword(event.target.value)} />

                <Button title="Entrar" onClick={handleSignIn}/>

                <Link to="/register">Criar conta</Link>
            </Form>
            <Background />
        </Container>
    )
}