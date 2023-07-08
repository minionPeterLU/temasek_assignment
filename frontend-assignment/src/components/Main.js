import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
const Main = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    }
    
    return (
        <MainContainer>
            <ButtonWrapper onClick={toggleModal}>
                Explore web APIs
            </ButtonWrapper>
            <BackgroundContainer 
                className="background"
                isOpen={isOpen}
                onClick={onClose}
            />
            <Sidebar isOpen={isOpen} />
        </MainContainer>
    );
}

export default Main;

const BackgroundContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000000B2;
    transform: translateX(${props => (props.isOpen ? "0%" : "100%")});
    transition: transform 0.5s ease-out,
    box-shadow ${props => (props.isOpen ? "0s" : "1s")} linear;
    will-change: transform;
    right: 0;
    top: 0;
    cursor: pointer;
`;

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
