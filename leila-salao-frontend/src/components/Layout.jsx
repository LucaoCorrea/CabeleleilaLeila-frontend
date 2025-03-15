import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const Cont = styled.div``;
const Content = styled.div`
  margin: 7rem;
`;

function Layout({ children }) {
  return (
    <Cont>
      <Navbar />
      <Content> {children}</Content>
      <Footer />
    </Cont>
  );
}

export default Layout;
