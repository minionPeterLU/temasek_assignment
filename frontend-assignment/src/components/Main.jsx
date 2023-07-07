import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
const Main = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    console.log("Debug isOpen: ", isOpen);
    return (
        <MainContainer>
            <ButtonWrapper onClick={toggleModal}>
                Explore web APIs
            </ButtonWrapper>
            <Sidebar isOpen={isOpen} />
        </MainContainer>
    );
}

export default Main;

const MainContainer = styled.div`
    background-color: #42607B;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const ButtonWrapper = styled.div`
    background-color: #00A1D4;
    border-color: none;
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
    text-align: center;
`;
