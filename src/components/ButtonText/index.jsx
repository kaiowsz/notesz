import { Container } from "./style";

export default function ButtonText({title, isActive, ...rest}) {

    return (
        <Container {...rest} 
        type="button" 
        isActive={isActive}>
            {title}
        </Container>
    )
}