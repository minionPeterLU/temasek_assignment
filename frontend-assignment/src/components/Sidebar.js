import React from 'react';
import styled from 'styled-components';
import SidebarItem from "./SidebarItem";
import InfiniteScroll from "react-infinite-scroll-component";

const Sidebar = (props) => {
    const { 
        data, 
        isOpen = false,
        handleOpenModal,
        mapModalData
    } = props;

    // For offline testing purposes
    // const mockMenuItems = [
    //     { label: '1forge.com' },
    //     { label: '1password.com' },
    //     { label: '1password.local' },
    //     { label: '6-dot-authentiqio.appspot.com' },
    //     { label: 'ably.io' },
    //     { label: 'ably.net' },
    //     { label: 'abstractapi.com' },
    //     { label: 'adafruit.com' },
    //     { 
    //         label: 'adobe.com',
    //         subMenu: [
    //             {
    //                 title: "Adobe Experience Manager (AEM) API",
    //                 icon: <AdobeIcon />
    //             }
    //         ]
    //     },
    //     { label: 'adyen.com' },
    //     { label: 'afterbanks.com' },
    //     { label: 'agco-ats.com' },
    // ];

    return (
        <SideBarContainer className='sidebar' isOpen={isOpen}>  
            <SidebarHeader>
                Select Provider
            </SidebarHeader>
            <InfiniteStyle dataLength={data.length} height="100%">
                <SidebarWrapper>
                    {data.map((item, index) => (
                        <SidebarItem 
                            item={item} 
                            index={index} 
                            handleOpenModal={handleOpenModal} 
                            mapModalData={mapModalData}    
                        />
                    ))}
                </SidebarWrapper>
            </InfiniteStyle>
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
    height: 100%;
    padding: 12px;
    border-radius: 8px;
    gap: 10px;
`;

const InfiniteStyle = styled(InfiniteScroll)`
    max-height: calc(100vh - 100px);
    overflow: auto;

    /* Hide the default scroll bar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  
    /* Customize the scroll bar appearance */
    &::-webkit-scrollbar {
      width: 0.5em;
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: tranparency;
      border-radius: 0.25em;
    }
`;