import React from "react";
import styled from 'styled-components';

const SidebarItemModal = ({onClose, modalData}) => {
    const infoData = modalData?.info;
    const contactData = infoData?.contact;
    const handleClose = () => {
        onClose();
    };

    return(
        <>
            <SidebarItemDetailWrapper>
                <HeaderWrapper>
                    <HeaderIcon src={infoData["x-logo"]?.url} />
                    <HeaderTitle>{infoData?.title}</HeaderTitle>
                </HeaderWrapper>
                <BodyWrapper>
                    <ContentWrapper>
                        <ContentTitle>
                            Description
                        </ContentTitle>
                        <Content>
                            {infoData?.description}
                        </Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>
                            Swagger
                        </ContentTitle>
                        <Content>
                            {modalData?.swaggerUrl}
                        </Content>
                    </ContentWrapper>
                    <ContentWrapper>
                        <ContentTitle>
                            Contact
                        </ContentTitle>
                        <ContactContentWrapper>
                            <ContentItemWrapper>
                                <ContentItemTitle> Email </ContentItemTitle>
                                <ContentItem>{contactData?.email}</ContentItem>
                            </ContentItemWrapper>
                            <ContentItemWrapper>
                                <ContentItemTitle> Name </ContentItemTitle>
                                <ContentItem>{contactData?.name}</ContentItem>
                            </ContentItemWrapper>
                            <ContentItemWrapper>
                                <ContentItemTitle> Url </ContentItemTitle>
                                <ContentItem>{contactData?.url}</ContentItem>
                            </ContentItemWrapper>
                        </ContactContentWrapper>
                    </ContentWrapper>
                </BodyWrapper>
            </SidebarItemDetailWrapper>
            <ButtonWrapper onClick={handleClose}>
                Explore web APIs
            </ButtonWrapper>
        </>
    );
}

export default SidebarItemModal;

const SidebarItemDetailWrapper = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderWrapper = styled.div`
    position: fixed;
    top: 50px;
    left: calc(50%-355px);
    width: 710px;
    height: 120px;
    padding: 18px 0px 18px 0px;
    gap: 10px
    font-size: 32px;
    line-height: 39px;
    letter-spacing: 0em;
    text-align: left; 
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const HeaderIcon = styled.img`
    width: 120px;
    height: 120px;
    padding-right: 10px;
`;

const HeaderTitle = styled.div`
    font-size: 32px;
    line-height: 39px;
    margin-top: auto;
    margin-bottom: auto;
`;

const BodyWrapper = styled.div`
    position: fixed;
    top: 256px;
    left: calc(50%-600px);
    width: 1200px;
    height: 463px;
    padding: 0px 120px 0px 120px;
    gap: 40px;
    text-align: center;
`;

const ContentTitle = styled.div`
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
    margin-bottom: 40px;
    text-align: left;
`;

const Content = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
`;

const ContactContentWrapper = styled.div`
`;

const ContentItemWrapper = styled.div`
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    height: 20px;
`;

const ContentItem = styled.div`
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
`;

const ContentItemTitle = styled.div`
    width: 45px;
    margin-right: 12px;
`;

const ButtonWrapper = styled.div`
    position: fixed;
    bottom: 50px;
    left: calc(50%-103px);
    background-color: #00A1D4;
    border-color: none;
    border-radius: 8px;
    cursor:pointer;
    font-family: 'Inter';
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    width: 206px;
    height: 29px;
    padding: 12px 16px 12px 16px;
    text-align: center;
`;