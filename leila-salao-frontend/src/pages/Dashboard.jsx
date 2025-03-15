import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createAppointment, getAppointments } from "../services/api";

const Dashboard = () => {
  const { user, role } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

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
      alert("Por favor, preencha todos os campos.");
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
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  return (
    <div>
      <h1>Painel de Agendamentos</h1>
      <p>
        Bem-vindo, {user?.email}! Aqui você pode gerenciar seus agendamentos.
      </p>

      {(role === "CLIENT" || role === "ADMIN") && (
        <>
          <button onClick={() => setShowPopup(true)}>Criar Agendamento</button>
          {showPopup && (
            <div>
              <h3>Criar Agendamento</h3>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Data"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Hora"
              />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Selecione um serviço</option>
                <option value="Corte de Cabelo">Corte de Cabelo</option>
                <option value="Coloração">Coloração</option>
                <option value="Hidratação">Hidratação</option>
                <option value="Escova">Escova</option>
              </select>
              <button onClick={handleCreateAppointment}>Salvar</button>
              <button onClick={() => setShowPopup(false)}>Fechar</button>
            </div>
          )}
        </>
      )}

      <div>
        <h3>Histórico de Agendamentos</h3>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <p>
              <strong>Data:</strong> {appointment.date} <strong>Hora:</strong>{" "}
              {appointment.time} <strong>Serviço:</strong> {appointment.service}{" "}
              <strong>Status:</strong> {appointment.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
