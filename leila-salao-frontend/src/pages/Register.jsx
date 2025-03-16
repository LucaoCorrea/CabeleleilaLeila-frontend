import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";
import styled from "styled-components";
import { FaUser, FaLock, FaEnvelope, FaIdBadge } from "react-icons/fa";
import backgroundImage from "../assets/background.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid #ccc;
  padding: 5px;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #333;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: #333;
  width: 100%;

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Icon = styled.div`
  color: #666;
  font-size: 18px;
`;

const LinkText = styled.p`
  text-align: center;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;

  a {
    color: #333;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
`;

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const user = await register(firstName, lastName, email, password);
      if (user) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Erro ao registrar. Tente novamente mais tarde."
        );
      } else {
        setError("Erro de conexão. Verifique sua internet e tente novamente.");
      }
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Registro</Title>
        <Subtitle>Crie sua conta para começar</Subtitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputContainer>
          <Icon>
            <FaIdBadge />
          </Icon>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Primeiro Nome"
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon>
            <FaIdBadge />
          </Icon>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Sobrenome"
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a Senha"
            required
          />
        </InputContainer>
        <Button type="submit">Registrar</Button>
        <LinkText>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </LinkText>
      </Form>
    </Container>
  );
}

export default Register;
