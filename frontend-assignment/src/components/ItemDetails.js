import React from "react";
import styled from 'styled-components';

const ItemDetails = () => {
    return(
        <ItemDetailsContainer>
            <Title>Description</Title>
            <Content></Content>
        </ItemDetailsContainer>
    );
}

export default ItemDetails;

const ItemDetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    gap: 40px;
    background: #42607B;
    color: white;
`;

const Title = styled.div`
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
`;

const Content = styled.div`
    
`;