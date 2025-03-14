import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

function EditAppointment() {
    const { id } = useParams();
    const [service, setService] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Lógica para buscar o agendamento pelo ID
        console.log('Buscando agendamento com ID:', id);
        // Simulação de dados
        setService('Corte de Cabelo');
        setDate('2023-10-15T10:00');
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para editar o agendamento
        console.log('Agendamento editado:', { id, service, date });
    };

    return (
        <Container>
            <Title>Editar Agendamento</Title>
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
                <Button type="submit">Salvar</Button>
            </Form>
        </Container>
    );
}

export default EditAppointment;