import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
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

function NewAppointment() {
    const [service, setService] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para criar um novo agendamento
        console.log('Novo agendamento:', { service, date });
    };

    return (
        <Container>
            <Title>Novo Agendamento</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="Serviço"
                />
                <Input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button type="submit">Agendar</Button>
            </Form>
        </Container>
    );
}

export default NewAppointment;