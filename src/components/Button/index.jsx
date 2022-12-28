import React from "react";
import { Container } from "./style"

function Button({title, loading, ...rest}) {

    return (
        <Container type="button"
        disabled={loading}
        {...rest}>

            { loading ? "Loading..." : title}
        
        </Container>
    )

}

export default Button  