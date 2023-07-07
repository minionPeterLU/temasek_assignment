import React from 'react';
import styled from 'styled-components';

const Start = () => {
    return (
        <ButtonContainer>
            Explore web APIs
        </ButtonContainer>
    );
}

export default Start;

const ButtonContainer = styled.div`
    background-color: #00A1D4;
    border-radius: 8px;
    cursor:pointer;
    font-family: 'Inter';
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    width: 197px;
    height: 29px;
    padding: 12px 16px 12px 16px;
`;
