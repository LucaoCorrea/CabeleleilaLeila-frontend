import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointments();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <Container>
      <Title>Meus Agendamentos</Title>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id}>
            {appointment.service} - {appointment.date}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Appointments;
