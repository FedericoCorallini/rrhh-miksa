import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'

import MainLayout from './layout/MainLayout.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { PermissionRequestPage } from './pages/PermissionRequestPage.jsx'
import { EmployeesPage } from './pages/EmployeesPage.jsx'
import { PermissionResponsePage } from './pages/PermissionResponsePage.jsx'

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const ProtectedRoute = ({ children, roleRequired }) => {
    const { user } = useAuth0();
    const userRole = user?.role;

    if (!isAuthenticated) {
      console.log("No autenticado");
      return <Navigate to="/login" />;
    }
    if (userRole !== roleRequired) {
      console.log("No autorizado");
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/perfil/:id' element={<ProfilePage />} />
            <Route path='/permisos' element={<PermissionResponsePage />} />
            <Route path='/solicitudes' element={<PermissionRequestPage />} />
            <Route path='/empleados' element={<EmployeesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
