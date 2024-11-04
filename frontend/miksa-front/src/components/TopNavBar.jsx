import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TopNavBar() {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to='/perfil/0'>Perfil</Nav.Link>
          <Nav.Link as={NavLink} to='/solicitudes'>Solicitudes</Nav.Link>
          <Nav.Link as={NavLink} to='/empleados'>Empleados</Nav.Link>
          <Nav.Link as={NavLink} to='/permisos'>Permisos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;