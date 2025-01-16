import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PermissionResponsePage from "./pages/PermissionResponsePage.jsx";
import PermissionRequestPage from "./pages/PermissionRequestPage.jsx";
import EmployeesPage from "./pages/EmployeesPage.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";


const App = () => {
  const { user } = useAuth0();

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
    <AuthWrapper>
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
    </AuthWrapper>
  );
}

export default App;