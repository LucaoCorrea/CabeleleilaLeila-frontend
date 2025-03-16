import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const FooterSection = styled.div`
  max-width: 250px;
`;

const FooterTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const FooterText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: #ccc;
  margin: 5px 0;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>Salão de Beleiza</FooterTitle>
        <FooterText>
          Transformando sua beleiza em elegância. Oferecemos os melhores
          serviços de corte, coloração e tratamentos capilares.
        </FooterText>
      </FooterSection>
      <FooterSection>
        <FooterTitle>Contato</FooterTitle>
        <FooterText>Email: contato@salaoleila.com</FooterText>
        <FooterText>Telefone: (11) 1234-5678</FooterText>
        <FooterText>Endereço: Rua da Beleiza, 123 - São Paulo, SP</FooterText>
      </FooterSection>
      <FooterSection>
        <FooterTitle>Redes Sociais</FooterTitle>
        <SocialIcons>
          <SocialIcon
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </SocialIcon>
          <SocialIcon
            href="https://wa.me/551112345678"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </SocialIcon>
        </SocialIcons>
      </FooterSection>
    </FooterContainer>
  );
}

export default Footer;
