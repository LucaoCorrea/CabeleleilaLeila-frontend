import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createAppointment, getAppointments } from "../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Popup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 300px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const AppointmentList = styled.div`
  margin-top: 20px;
`;

const AppointmentItem = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const Dashboard = () => {
  const { user, role } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");

  // Busca os agendamentos ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments(role === "ADMIN" ? null : user.id);
        setAppointments(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };
    fetchData();
  }, [role, user.id]);

  // Função para criar um agendamento
  const handleCreateAppointment = async () => {
    if (!date || !time || !service) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const appointmentData = {
      date: `${date}T${time}`,
      service,
      status: "Pending",
    };

    try {
      const createdAppointment = await createAppointment(appointmentData);
      setAppointments([...appointments, createdAppointment]);
      setShowPopup(false);
      setDate("");
      setTime("");
      setService("");
      setError("");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      setError("Erro ao criar agendamento. Tente novamente.");
    }
  };

  return (
    <Container>
      <Title>Painel de Agendamentos</Title>
      <WelcomeMessage>
        Bem-vindo, {user?.email}! Aqui você pode gerenciar seus agendamentos.
      </WelcomeMessage>

      {(role === "CLIENT" || role === "ADMIN") && (
        <>
          <Button onClick={() => setShowPopup(true)}>Criar Agendamento</Button>
          {showPopup && (
            <>
              <Overlay onClick={() => setShowPopup(false)} />
              <Popup>
                <h3>Criar Agendamento</h3>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Data"
                />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Hora"
                />
                <Select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Corte de Cabelo">Corte de Cabelo</option>
                  <option value="Coloração">Coloração</option>
                  <option value="Hidratação">Hidratação</option>
                  <option value="Escova">Escova</option>
                </Select>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button onClick={handleCreateAppointment}>Salvar</Button>
                <Button onClick={() => setShowPopup(false)}>Fechar</Button>
              </Popup>
            </>
          )}
        </>
      )}

      <AppointmentList>
        <h3>Histórico de Agendamentos</h3>
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id}>
            <p>
              <strong>Data:</strong> {new Date(appointment.date).toLocaleDateString()}{" "}
              <strong>Hora:</strong> {new Date(appointment.date).toLocaleTimeString()}
            </p>
            <p>
              <strong>Serviço:</strong> {appointment.service}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
          </AppointmentItem>
        ))}
      </AppointmentList>
    </Container>
  );
};

export default Dashboard;