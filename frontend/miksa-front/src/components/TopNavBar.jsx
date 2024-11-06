import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function TopNavBar() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={NavLink} to='/perfil/0'>Perfil</Button>
          <Button color="inherit" component={NavLink} to='/solicitudes'>Solicitudes</Button>
          <Button color="inherit" component={NavLink} to='/empleados'>Empleados</Button>
          <Button color="inherit" component={NavLink} to='/permisos'>Permisos</Button>
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;