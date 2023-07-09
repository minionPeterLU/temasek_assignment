import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import SidebarItemModal from "./SidebarItemModal";
import SidebarItemDetails from './SidebarItemDetails';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataList, setDataList ] = useState([]);
    const [status, setStatus] = useState(404);
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    }
    
    const handleOpenModal = (value) => {
        setModalOpen(value);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const mapModalData = (data) => {
        setModalData(data);
    };

    const fetchAPI = () => {
        axios.get('https://api.apis.guru/v2/providers.json')
        .then(function (response) {
            setStatus(response.status);
            if(response.data.data){
                // Set response data
                setDataList(response.data.data);
            }
        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });
    };

    const mapData = () => {
        var newDataList = [];
        dataList?.map((item) => {
            newDataList.push({label: item});
        })
        setData(newDataList);
    }

    useEffect(() => {
        fetchAPI();
    }, []);

    useEffect(() => {
        if(status===200){
            mapData();
        }
    }, [status]);

    return (
        <>
            <MainContainer>
                <ButtonWrapper onClick={toggleModal}>
                    Explore web APIs
                </ButtonWrapper>
                <BackgroundContainer 
                    className="background"
                    isOpen={isOpen}
                    onClick={onClose}
                />
                <Sidebar 
                    isOpen={isOpen} 
                    data={data}
                    handleOpenModal={handleOpenModal}
                    mapModalData={mapModalData}
                />
            </MainContainer>
            <SidebarItemModal 
                isOpen={modalOpen} 
                
            >
                <SidebarItemDetails
                    modalData={modalData}
                    onClose={handleCloseModal} 
                />
            </SidebarItemModal>
        </>
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
