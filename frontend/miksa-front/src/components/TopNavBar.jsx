import React, { useState, useEffect } from 'react';
import { getEmployeeByEmail } from '../utils/Axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import './TopNavBar.css';
import logoMiksa from '../assets/logos/MiksaColors.png';

function TopNavBar({ setIsTabSelected }) {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(false); // Set initial state to false

  useEffect(() => {
    const pathToValueMap = {
      '/perfil': 0,
      '/empleados': 1,
      '/solicitudes': 2,
      '/permisos': 3,
    };
    const currentPath = Object.keys(pathToValueMap).find(path => location.pathname.startsWith(path));
    const newValue = pathToValueMap[currentPath] ?? false;
    setValue(newValue);
    setIsTabSelected(newValue !== false);
  }, [location, setIsTabSelected]);

  const handleProfileClick = async () => {
    const employeeData = await getEmployeeByEmail();
    const userId = employeeData.data.id;
    if (userId) {
      navigate(`/perfil/${userId}`);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update state when a tab is selected
    setIsTabSelected(newValue !== false); // Update isTabSelected state
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <header style={{ 
        height: '10vh', 
        backgroundColor: '#8ad453',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 2vh'
        }}>
        <img src={logoMiksa} alt="Miksa Logo" style={{ height: '40%' }} className="clickable-logo" onClick={handleLogoClick} />
        <LogoutButton />
      </header>
      <AppBar position="static" color="default">
        <Toolbar sx={{ height: '5vh' }}>
          <Tabs
            value={value} // Assign state value to Tabs component
            onChange={handleChange} // Handle tab change
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: '#8ad453' } }}
            sx={{
              '& .MuiTab-root.Mui-selected': { color: '#8ad453' },
            }}
          >
            <Tab label="Perfil" onClick={handleProfileClick} />
            {user && user['roles/roles'] && user['roles/roles'].includes('admin') && (
              <Tab label="Empleados" component={NavLink} to='/empleados' />
            )}
            <Tab label="Solicitudes" component={NavLink} to='/solicitudes' />
            {user && user['roles/roles'] && (user['roles/roles'].includes('admin') || user['roles/roles'].includes('gerente')) && (
              <Tab label="Administrar Permisos" component={NavLink} to='/permisos' />
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopNavBar;