import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ArrowIcon from '../icons/ArrowIcon';
import axios from 'axios';

const SidebarItem = (props) => {
    const { item , index } = props;
    const [rotation, setRotation] = useState(0);
    const [ hasSubMenu, setHasSubMenu ] = useState(false);
    const [ subMenu, setSubMenu ] = useState({});
    const [ active, setActive ] = useState(false);
    const [status, setStatus] = useState(404);
    const [ data, setData ] = useState(null);

    const toggle = () => {
        setActive(!active);
    };

    const fetchAPI = () => {
        axios.get(`https://api.apis.guru/v2/${item.label}.json`)
        .then(function (response) {
            setStatus(response.status);
            if(response.data && item.label === "adobe.com"){
                // Set response data
                setData(response.data.apis["adobe.com:aem"]);
            }
        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });
    };

    const handleClick = () => {
        if(rotation === 0) {
            setRotation(rotation + 180);
        } else {
            setRotation(rotation - 180);
        }
    }

    useEffect(() => {
        if(rotation===180){
            fetchAPI();
        }
    },[rotation]);

    useEffect(() => {
        if(status===200 && item.label === "adobe.com"){
            setHasSubMenu(true);
            setSubMenu({
                url:data?.info["x-logo"].url,
                title:data.info.title,
            });
        }
    }, [status]);

    return (
        <SideBarItemContainer 
            key={index}
            rotation={rotation}    
        >
            <SidebarItemTitleWrapper>
                <SidebarItemTitle>
                    {item.label}
                </SidebarItemTitle>
                <ArrowIcon 
                    handleClick={handleClick}
                    hasSubMenu={hasSubMenu} 
                    rotation={rotation}
                    onClick={toggle}
                />
            </SidebarItemTitleWrapper>
            { hasSubMenu && rotation === 180 && (
                <SidebarItemBodyWrapper active={active}>
                    <SideBarItemWrapper>
                        <SubItemImage src={subMenu.url} />
                        <SubItemTitle>{subMenu.title}</SubItemTitle>
                    </SideBarItemWrapper>
                </SidebarItemBodyWrapper>
            )}
        </SideBarItemContainer>
    );
}

export default SidebarItem;

const SideBarItemContainer = styled.div`
    text-align: left;
    width: 456px;
    height: auto;
    padding: 10px;
    border-radius: 8px;
    background-color: ${props => props.rotation === 180 ? "#1A2632": "#42607B"};
    transition: background-color 1s ease-out;
    display: flex;
    flex-direction: column;
`;

const SidebarItemTitle = styled.div`
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 29px;
`;

const SidebarItemTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SideBarItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Inter;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
`;

const SidebarItemBodyWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const SubItemTitle = styled.div`
    padding: 4px;
    max-height: 24px;
    width: 100%;
`;

const SubItemImage = styled.img`
    width: 32px;
    height: 32px;
`;