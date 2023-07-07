import React from 'react';
import styled from 'styled-components';
import ArrowIcon from '../icons/ArrowIcon';

const Sidebar = (props) => {
    const { isOpen = false } = props;
    
    const menuItems = [
        { label: '1forge.com', hasSubMenu: false },
        { label: '1password.com', hasSubMenu: false },
        { label: '1password.local', hasSubMenu: false },
        { label: '6-dot-authentiqio.appspot.com', hasSubMenu: false },
        { label: 'ably.io', hasSubMenu: false },
        { label: 'ably.net', hasSubMenu: false },
        { label: 'abstractapi.com', link: false },
        { label: 'adafruit.com', hasSubMenu: false },
        { label: 'adobe.com', hasSubMenu: true },
        { label: 'adyen.com', hasSubMenu: false },
        { label: 'afterbanks.com', hasSubMenu: false },
        { label: 'agco-ats.com', hasSubMenu: false },
    ];

    return (
        <Container className="sidebar" isOpen={isOpen}>
            <SidebarHeader>
                Select Provider
            </SidebarHeader>
            <SidebarWrapper>
                {menuItems.map((item, index) => (
                    <SubMenuWrapper key={index}>
                        <SubMenuTitle>{item.label}</SubMenuTitle>
                        <ArrowIcon hasSubMenu={item.hasSubMenu} />
                    </SubMenuWrapper>
                ))}
            </SidebarWrapper>
        </Container>
    );
};

export default Sidebar;

const Container = styled.div`
    position: fixed;
    width: 520px;
    height: 100%;
    max-width: 100%;
    background-color: #00A1D4;
    transform: translateX(${props => (props.isOpen ? "0%" : "100%")});
    transition: transform 0.5s ease-out,
    box-shadow ${props => (props.isOpen ? "0s" : "1s")} linear;
    will-change: transform;
    right: 0;
    top: 0;
    z-index: 999;
    color: white;
`;

const SidebarHeader = styled.div`
    font-family: Inter;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 8px;
`;

const SidebarWrapper = styled.div`
    flex-direction: column;
    width: 480px;
    height: 758px;
    padding: 12px;
    border-radius: 8px;
    gap: 10px;
`; 

const SubMenuWrapper = styled.div`
    text-align: left;
    width: 456px;
    height: 52px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`;

const SubMenuTitle = styled.div`
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 29px;
`;
