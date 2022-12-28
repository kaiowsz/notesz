import { useState } from "react";
import { FiMail, FiLock, FiUser} from "react-icons/fi"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Background } from "./style";

import { api } from "../../services/api";

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignUp() {
       if(!name || !email || !password) {
        return alert("Preencha todos os campos corretamente.")
       }

       api.post("/users", {name, email, password})
       .then(() => {
        alert("Usuário cadastrado com sucesso")
        navigate("/");
       })
       .catch(error => {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert("Não foi possível realizar o cadastro. Por favor, tente novamente.")
            }
       })

    }

    return (
    <Container>
        <Background />
            <Form>
                <h1>Notesz</h1>
                <p>Salve e gerencie suas anotações mais importantes.</p>

                <h2>Crie sua conta</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={event => setName(event.target.value)} />

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

                <Button title="Cadastrar" onClick={handleSignUp}/>

                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container>
    )
}