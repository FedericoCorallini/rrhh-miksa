import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

import MainLayout from './layout/MainLayout.jsx';
import Loading from './components/Loading.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { PermissionRequestPage } from './pages/PermissionRequestPage.jsx';
import { EmployeesPage } from './pages/EmployeesPage.jsx';
import { PermissionResponsePage } from './pages/PermissionResponsePage.jsx';

function App() {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `http://spring-miksa`,
            },
          });
          sessionStorage.setItem('jwt', accessToken);
          console.log(accessToken);
        } catch (e) {
          console.log(e.message);
        }
      } else {
        loginWithRedirect();
      }
    };

    if (!isAuthenticated && !isLoading) {
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading]);


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

  if (isLoading) {
    return <div><Loading/>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/perfil/:id' element={<ProfilePage />} />
          <Route path='/permisos' element={<PermissionResponsePage />} />
          <Route path='/solicitudes' element={<PermissionRequestPage />} />
          <Route path='/empleados' element={<EmployeesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;