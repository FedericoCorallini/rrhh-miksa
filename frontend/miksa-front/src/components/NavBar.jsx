import { NavLink } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './navbar.css'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ m: 0 }}
            >
              {/* Aquí podrías agregar un ícono si lo necesitas */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* Título u otro contenido */}
            </Typography>
            {isAuthenticated && (
              <>
                <Button>
                  <NavLink className='active' to='/perfil/email'>Perfil Personal</NavLink>
                </Button>
                <Button>
                  <NavLink className='active' to='/solicitudes'>Solicitar Permisos</NavLink>
                </Button>
              </>
            )}
            {user && user['roles/roles'] && user['roles/roles'].includes("admin") && (
              <Button>
                <NavLink className='active' to='/empleados'>Lista de Empleados</NavLink>
              </Button>
            )}
            {user && user['roles/roles'] && user['roles/roles'].includes("gerente") && (
              <Button>
                <NavLink className='active' to='/permisos'>Evaluar Permisos</NavLink>
              </Button>
            )}
          </Box>
         
          <Box sx={{ ml: 'auto' }}>
            <LoginButton />
            {isAuthenticated && (
              <LogoutButton />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
