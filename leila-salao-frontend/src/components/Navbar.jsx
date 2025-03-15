import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const Logo = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Logo to="/dashboard">Salão de Beleiza</Logo>
      <NavLinks>
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/login">Sair</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
