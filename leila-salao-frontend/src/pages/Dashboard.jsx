import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

// Definindo os serviços diretamente no código
const hairServices = [
  {
    name: "Corte de Cabelo",
    price: 50,
    description: "Corte de cabelo personalizado.",
  },
  {
    name: "Coloração",
    price: 120,
    description: "Coloração profissional com produtos de alta qualidade.",
  },
  {
    name: "Hidratação",
    price: 80,
    description: "Hidratação profunda para cabelos ressecados.",
  },
  {
    name: "Escova",
    price: 60,
    description: "Escova para alisar ou modelar o cabelo.",
  },
];

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AppointmentList = styled.div`
  margin-top: 20px;
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
`;

const AppointmentItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${(props) =>
    props.status === "Confirmed" ? "#28a745" : "#ffc107"};
  color: white;
`;

const PhoneMessage = styled.p`
  color: #dc3545;
  font-weight: bold;
`;

function Dashboard() {
  const { user, role } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(savedAppointments);
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleCreateAppointment = () => {
    if (!date || !time || !service) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Verificar se há menos de 2 dias de antecedência
    const today = new Date();
    const appointmentDate = new Date(`${date}T${time}`);
    const diffInDays = Math.ceil((appointmentDate - today) / (1000 * 60 * 60 * 24));

    if (diffInDays < 2) {
      setShowPhone(true);
      return;
    }

    // Verificar se já existe um agendamento no mesmo dia e horário
    const isSlotTaken = appointments.some(
      (appointment) => appointment.date === date && appointment.time === time
    );

    if (isSlotTaken) {
      alert("Já existe um agendamento para este horário. Escolha outro horário.");
      return;
    }

    const newAppointment = {
      id: editId || appointments.length + 1,
      date,
      time,
      service,
      status: "Pending",
      price: selectedService ? selectedService.price : 0,
    };

    if (editId) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === editId ? newAppointment : appointment
        )
      );
    } else {
      setAppointments([...appointments, newAppointment]);
    }

    setShowPopup(false);
    setDate("");
    setTime("");
    setService("");
    setSelectedService(null);
    setEditId(null);
    setShowPhone(false);
  };

  const handleEdit = (id) => {
    const appointmentToEdit = appointments.find((appointment) => appointment.id === id);
    if (appointmentToEdit) {
      setDate(appointmentToEdit.date);
      setTime(appointmentToEdit.time);
      setService(appointmentToEdit.service);
      setEditId(id);
      setShowPopup(true);
    }
  };

  const handleRemove = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleConfirm = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Confirmed" } : appointment
      )
    );
  };

  const handleServiceChange = (e) => {
    const selected = hairServices.find((service) => service.name === e.target.value);
    setService(selected.name);
    setSelectedService(selected);
  };

  return (
    <Container>
      <Title>Painel de Agendamentos</Title>
      <p>Bem-vindo, {user?.email}! Aqui você pode gerenciar seus agendamentos.</p>

      {(role === "CLIENT" || role === "ADMIN") && (
        <>
          <Button onClick={() => setShowPopup(true)}>Criar Agendamento</Button>
          {showPopup && (
            <Popup>
              <h3>{editId ? "Editar Agendamento" : "Criar Agendamento"}</h3>
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
              <Select value={service} onChange={handleServiceChange}>
                <option value="">Selecione um serviço</option>
                {hairServices.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name} - R$ {service.price}
                  </option>
                ))}
              </Select>
              {selectedService && <p>{selectedService.description}</p>}
              {showPhone && (
                <PhoneMessage>
                  Agendamentos com menos de 2 dias de antecedência devem ser feitos por telefone: (01) 0909-9291
                </PhoneMessage>
              )}
              <Button onClick={handleCreateAppointment}>
                {editId ? "Salvar Edição" : "Salvar"}
              </Button>
              <Button onClick={() => setShowPopup(false)}>Fechar</Button>
            </Popup>
          )}
        </>
      )}

      <AppointmentList>
        <h3>Histórico de Agendamentos</h3>
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id}>
            <div>
              <strong>Data:</strong> {appointment.date} <strong>Hora:</strong> {appointment.time}{" "}
              <strong>Serviço:</strong> {appointment.service} <strong>Valor:</strong> R$ {appointment.price}{" "}
              <StatusBadge status={appointment.status}>{appointment.status}</StatusBadge>
            </div>
            <div>
              {role === "ADMIN" && (
                <>
                  <ActionButton
                    style={{ backgroundColor: "#28a745", color: "white" }}
                    onClick={() => handleEdit(appointment.id)}
                  >
                    Editar
                  </ActionButton>
                  <ActionButton
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                    onClick={() => handleRemove(appointment.id)}
                  >
                    Remover
                  </ActionButton>
                </>
              )}
              {(role === "ADMIN" || role === "CLIENT") && (
                <ActionButton
                  style={{ backgroundColor: "#007bff", color: "white" }}
                  onClick={() => handleConfirm(appointment.id)}
                >
                  Confirmar
                </ActionButton>
              )}
            </div>
          </AppointmentItem>
        ))}
      </AppointmentList>
    </Container>
  );
}

export default Dashboard;