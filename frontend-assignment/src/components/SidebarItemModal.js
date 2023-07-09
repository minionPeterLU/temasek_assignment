import React from "react";
import styled from 'styled-components';

const SidebarItemModal = ({ isOpen,  children }) => {
    return(
        <>
            {isOpen && (
                <SidebarItemModalContainer>
                    {children}
                </SidebarItemModalContainer>
            )}
        </>
    );
}

export default SidebarItemModal;

const SidebarItemModalContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #42607B;
    color: white;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Inter;
    font-weight: 400;
`;
