import { Container } from "./style"; 

export default function Textarea({value, ...rest}) {

    return (
        <Container {...rest}>
            { value }
        </Container>
    )

}