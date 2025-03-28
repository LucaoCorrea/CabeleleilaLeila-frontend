import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createAppointment, getAppointments } from "../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

const ButtonExit = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #af4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #883636;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
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
  width: 400px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
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
  width: 23.6rem;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 8px;
  }
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

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.9rem;
  margin-top: 5px;
  text-align: center;
`;

const LoadingMessage = styled.p`
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-top: 20px;
`;

const ContactInfo = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-top: 10px;
`;

const Dashboard = () => {
  const { user, role } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAppointments(role === "ADMIN" ? null : user.id);
        setAppointments(data);
        setError("");
      } catch (error) {
        if (
          error.message ===
          "Você não tem permissão para acessar esses agendamentos."
        ) {
          setError(error.message);
        } else {
          console.error("Erro ao buscar agendamentos:", error);
          setError("Erro ao buscar agendamentos. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [role, user.id]);

  const handleCreateAppointment = async () => {
    if (!date || !time || !service) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const selectedDate = new Date(`${date}T${time}`);
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 2);

    if (selectedDate < today) {
      setError("Não é possível agendar para uma data passada.");
      return;
    }

    if (selectedDate < minDate) {
      setError(
        "O agendamento deve ser feito com pelo menos dois dias de antecedência."
      );
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

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage>Carregando agendamentos...</LoadingMessage>}

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
                  min={new Date().toISOString().split("T")[0]}
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
                <ContactInfo>
                  Dúvidas? Ligue para Leila: <strong>(09) 0909-2931</strong>
                </ContactInfo>
                <Button onClick={handleCreateAppointment}>Salvar</Button>
                <ButtonExit onClick={() => setShowPopup(false)}>
                  Fechar
                </ButtonExit>
              </Popup>
            </>
          )}
        </>
      )}

      <AppointmentList>
        <h3>Histórico de Agendamentos</h3>
        {appointments.length === 0 && !loading && (
          <p>Nenhum agendamento encontrado.</p>
        )}
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id}>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(appointment.date).toLocaleDateString()}{" "}
              <strong>Hora:</strong>{" "}
              {new Date(appointment.date).toLocaleTimeString()}
            </p>
            <p>
              <strong>Serviço:</strong> {appointment.service}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
            {role === "ADMIN" && (
              <p>
                <strong>Usuário:</strong> {appointment.user?.id}
              </p>
            )}
          </AppointmentItem>
        ))}
      </AppointmentList>
    </Container>
  );
};

export default Dashboard;
