import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        if (user) {
            authLogin(user);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    );
}

export default Login;