import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PermissionResponsePage from "./pages/PermissionResponsePage.jsx";
import PermissionRequestPage from "./pages/PermissionRequestPage.jsx";
import EmployeesPage from "./pages/EmployeesPage.jsx";
import Loading from "./components/Loading.jsx";

const App = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, isLoading, user } = useAuth0();

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
      }
    };

    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    } else {
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading]);

  if (isLoading) {
    return <div><Loading />Loading...</div>;
  }

  const ProtectedRoute = ({ children, roleRequired }) => {
    if (!user || !user['roles/roles'] || !user['roles/roles'].includes(roleRequired)) {
      console.log("No validado o requiere rol");
      console.log("Usuario:", user);
      console.log("Rol requerido;", roleRequired);
      console.log("Roles del usuario:", user['roles/roles']);
      return <Navigate to="/" />;
    }
    return children;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/perfil/:id' element={<ProfilePage />} />
          <Route path='/permisos' element={
            <ProtectedRoute roleRequired="gerente">
              <PermissionResponsePage />
            </ProtectedRoute>
          } />
          <Route path='/solicitudes' element={<PermissionRequestPage />} />
          <Route path='/empleados' element={
            <ProtectedRoute roleRequired="admin">
              <EmployeesPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;