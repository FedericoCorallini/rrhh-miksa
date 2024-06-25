import { NavLink } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './navbar.css'


export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 , width: 775}}
        >
        
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

        </Typography>
        <Button >
          <NavLink className='active' to='/perfil/0 ' > Perfil </NavLink>
        </Button>

        <Button >
          <NavLink className='active' to='/solicitudes ' > Solicitudes </NavLink>
        </Button>
        <Button >
          <NavLink className='active' to='/empleados ' > Empleados </NavLink>
        </Button>
        <Button >
          <NavLink className='active' to='/permisos ' > Permisos </NavLink>
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}
