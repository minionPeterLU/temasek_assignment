import styled from 'styled-components';

const ArrowIcon = (props) => {
    const { hasSubMenu, rotation, handleClick } = props;

    return (  
        <Container hasSubMenu={hasSubMenu}> 
            <RotateSVG 
                width="32" 
                height="32" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                rotation={rotation}
                onClick={handleClick}
            >
                <path   
                    d="M9.88 12.58L16 17.17L22.12 12.58L24 14L16 20L8 14L9.88 12.58Z"     
                    fill="#F5F5F5"
                />
            </RotateSVG>
        </Container>
    );
}

export default ArrowIcon;

const Container = styled.div`
    ${props => props.hasSubMenu && "cursor: pointer"};
`;

const RotateSVG = styled.svg`
    transform: ${props => `rotate(${props.rotation}deg)`};
    transition: transform 0.5s ease-out;
`;