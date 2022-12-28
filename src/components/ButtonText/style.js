import styled from "styled-components";

export const Container = styled.button`

    color: ${({theme, isActive}) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
    border: none;
    background: none;
    font-size: 16px;

`