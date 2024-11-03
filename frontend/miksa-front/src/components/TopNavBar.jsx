import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom'
import TopNavBar from '../components/TopNavBar';

function TopNavBar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href='/perfil/0'> Perfil</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to='/solicitudes ' > Solicitudes</Nav.Link>
            <Nav.Link to='/empleados ' > Empleados</Nav.Link>
            <Nav.Link to='/permisos ' > Permisos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavBar;