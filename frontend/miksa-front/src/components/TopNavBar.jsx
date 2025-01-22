import React, { useState } from 'react';
import { getEmployeeByEmail } from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import './TopNavBar.css';

function TopNavBar() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleProfileClick = async () => {
    console.log(`${sessionStorage.getItem('jwt')}`);
    const employeeData = await getEmployeeByEmail();
    console.log(employeeData.data);
    /*if (userId) {
      navigate(`/perfil/${userId}`);
    }*/
  };
  

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit"  onClick={handleProfileClick}>Perfil</Button>
          <Button color="inherit" component={NavLink} to='/solicitudes'>Solicitudes</Button>
          {user && user['roles/roles'] && user['roles/roles'].includes('admin') && (
            <Button color="inherit" component={NavLink} to='/empleados'>Empleados</Button>
          )}
          {user && user['roles/roles'] && (user['roles/roles'].includes('admin') || user['roles/roles'].includes('gerente')) && (
            <Button color="inherit" component={NavLink} to='/permisos'>Permisos</Button>
          )}
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;