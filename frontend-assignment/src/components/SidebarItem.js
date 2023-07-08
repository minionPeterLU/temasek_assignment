import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ArrowIcon from '../icons/ArrowIcon';

const SidebarItem = (props) => {
    const { item , index } = props;
    const [rotation, setRotation] = useState(0);
    const [ hasSubMenu, setHasSubMenu ] = useState(false);
    const [ subMenu, setSubMenu ] = useState([]);
    const [ active, setActive ] = useState(false);

    const toggle = () => {
        setActive(!active);
    };

    const handleClick = () => {
        if(item?.subMenu && rotation === 0) {
            setRotation(rotation + 180);
        } else if(item?.subMenu && rotation !== 0) {
            setRotation(rotation - 180);
        }
    }

    useEffect(() => {
        if(item?.subMenu){
            setHasSubMenu(true);
            setSubMenu(item.subMenu);
        }
    }, []);

    if(hasSubMenu && rotation === 180){
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
                <SidebarItemBodyWrapper active={active}>
                    {subMenu.map((subItem,index) => {
                        return(
                            <SideBarItemWrapper key={`child_${index}`}>
                                <div>{subItem.icon}</div>
                                <SubItemTitle>{subItem.title}</SubItemTitle>
                            </SideBarItemWrapper>
                        )
                    })}
                </SidebarItemBodyWrapper>
            </SideBarItemContainer>
        );
    } else {
        return (
            <SideBarItemContainer key={index}>
                <SidebarItemTitleWrapper>
                    <SidebarItemTitle>
                        {item.label}
                    </SidebarItemTitle>
                    <ArrowIcon 
                        handleClick={handleClick}
                        hasSubMenu={hasSubMenu} 
                        rotation={rotation}
                    />
                </SidebarItemTitleWrapper>
            </SideBarItemContainer>
        );
    }

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