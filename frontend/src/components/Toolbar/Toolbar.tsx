// @ts-ignore
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
// @ts-ignore
import {useAppContext} from "../../context/AppContext.tsx";

export const Toolbar = () => {
  const {setCurrentEmployee} = useAppContext();

  const handleLogout = () => {
    setCurrentEmployee(null);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">My Toolbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" role="navigation">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              href="#logout"
              onClick={handleLogout}
            >Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
