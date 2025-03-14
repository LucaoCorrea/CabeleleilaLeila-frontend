import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    text-align: center;
`;

const Title = styled.h1`
    color: #333;
`;

function Dashboard() {
    return (
        <Container>
            <Title>Dashboard</Title>
            <p>Bem-vindo ao painel de agendamentos!</p>
        </Container>
    );
}

export default Dashboard;