import styled from 'styled-components';

const ArrowIcon = (props) => {
    const { hasSubMenu = false } = props;
    return (  
        <Container hasSubMenu={hasSubMenu}> 
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.88 12.58L16 17.17L22.12 12.58L24 14L16 20L8 14L9.88 12.58Z" fill="#F5F5F5"/>
            </svg>
        </Container>
    );
}

export default ArrowIcon;

const Container = styled.div`
    ${props => props.hasSubMenu && "cursor: pointer"};
`;