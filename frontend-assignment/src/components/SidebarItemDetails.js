import React from "react";
import styled from 'styled-components';

const SidebarItemModal = ({ onClose, modalData }) => {
    const infoData = modalData?.info;
    const contactData = infoData?.contact;
    const handleClose = () => {
        onClose();
    };

    return (
        <SidebarItemDetailContainer>
            <HeaderSection>
                <HeaderWrapper>
                    <HeaderIcon src={infoData["x-logo"]?.url} />
                    <HeaderTitle>{infoData?.title}</HeaderTitle>
                </HeaderWrapper>
            </HeaderSection>
            <BodySection>
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
            </BodySection>
            <FooterSection>
                <ButtonWrapper onClick={handleClose}>
                    Explore web APIs
                </ButtonWrapper>
            </FooterSection>
        </SidebarItemDetailContainer>
    );
}

export default SidebarItemModal;

const SidebarItemDetailContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 40px;
`;

const HeaderSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 156px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
`;

const HeaderIcon = styled.img`
    width: 120px;
    height: 120px;
`;

const HeaderTitle = styled.div`
    font-size: 32px;
    line-height: 39px;
    margin-top: auto;
    margin-bottom: auto;
    font-family: Inter;
    text-align: left;
    font-weight: 400;
    width: 580px;
`;

const BodySection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 463px;
`;

const BodyWrapper = styled.div`
    gap: 40px;
    text-align: center;
    width: 1200px;

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

const FooterSection = styled.div`
    display: flex;
    flex-diection: row;
    justify-content: center;
`;