import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 10px 20px;
    background-color: ${({ primary }) => (primary ? '#007bff' : '#6c757d')};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: ${({ primary }) => (primary ? '#0056b3' : '#5a6268')};
    }
`;

export default function Button({ children, primary, onClick }) {
    return (
        <StyledButton primary={primary} onClick={onClick}>
            {children}
        </StyledButton>
    );
}