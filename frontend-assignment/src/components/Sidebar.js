import React from 'react';
import styled from 'styled-components';
import SidebarItem from "./SidebarItem";
import AdobeIcon from "../icons/AdobeIcon";

const Sidebar = (props) => {
    const { isOpen = false } = props;

    const menuItems = [
        { label: '1forge.com' },
        { label: '1password.com' },
        { label: '1password.local' },
        { label: '6-dot-authentiqio.appspot.com' },
        { label: 'ably.io' },
        { label: 'ably.net' },
        { label: 'abstractapi.com' },
        { label: 'adafruit.com' },
        { 
            label: 'adobe.com',
            subMenu: [
                {
                    title: "Adobe Experience Manager (AEM) API",
                    icon: <AdobeIcon />
                }
            ]
        },
        { label: 'adyen.com' },
        { label: 'afterbanks.com' },
        { label: 'agco-ats.com' },
    ];

    return (
        <SideBarContainer className='sidebar' isOpen={isOpen}>  
            <SidebarHeader>
                Select Provider
            </SidebarHeader>
            <SidebarWrapper>
                {menuItems.map((item, index) => (
                    <SidebarItem item={item} index={index} />
                ))}
            </SidebarWrapper>
        </SideBarContainer>
    );
};

export default Sidebar;

const SideBarContainer = styled.div`
    position: fixed;
    width: 520px;
    height: 100%;
    max-width: 100%;
    background-color: #42607B;
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
