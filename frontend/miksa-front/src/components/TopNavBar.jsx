import React, { useState } from 'react';
import { getEmployeeByEmail } from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import './TopNavBar.css';
import logoMiksa from '../assets/logos/MiksaColores.png';

function TopNavBar() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [value, setValue] = useState(0); // Define el estado value con un valor inicial

  const handleProfileClick = async () => {
    console.log(`${sessionStorage.getItem('jwt')}`);
    const employeeData = await getEmployeeByEmail();
    console.log(employeeData.data);
    const userId = employeeData.data.id;
    if (userId) {
      navigate(`/perfil/${userId}`);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue); // Actualiza el estado value cuando se selecciona una pestaña
  };

  return (
    <>
      <header style={{ 
        height: '10vh', 
        backgroundColor: '#66DC69',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 2vh'
        }}>
        <img src={logoMiksa} alt="Miksa Logo" style={{ height: '40%' }} />
        <LogoutButton />
      </header>
      <AppBar position="static" color="default">
        <Toolbar sx={{ height: '5vh' }}>
          <Tabs
            value={value} // Asigna el estado value al componente Tabs
            onChange={handleChange} // Maneja el cambio de pestaña
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: '#5bbc5e' } }}
            sx={{
              '& .MuiTab-root.Mui-selected': { color: '#5bbc5e' },
            }}
          >
            <Tab label="Perfil" onClick={handleProfileClick} />
            <Tab label="Solicitudes" component={NavLink} to='/solicitudes' />
            {user && user['roles/roles'] && user['roles/roles'].includes('admin') && (
              <Tab label="Empleados" component={NavLink} to='/empleados' />
            )}
            {user && user['roles/roles'] && (user['roles/roles'].includes('admin') || user['roles/roles'].includes('gerente')) && (
              <Tab label="Permisos" component={NavLink} to='/permisos' />
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopNavBar;