import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";
import styled from "styled-components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import backgroundImage from "../assets/background.jpg";
import { useAuth } from "../context/AuthContext";

// Estilos definidos no mesmo arquivo
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

// Componente Login
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin(email, password);
      if (response && response.access_token) {
        authLogin(response.access_token);

        navigate("/dashboard");
      } else {
        setError("Token de autenticação não retornado. Verifique suas credenciais.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erro ao fazer login. Tente novamente mais tarde."
      );
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Subtitle>Faça login para acessar sua conta</Subtitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
        <Button type="submit">Entrar</Button>
        <LinkText>
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </LinkText>
      </Form>
    </Container>
  );
}

export default Login;