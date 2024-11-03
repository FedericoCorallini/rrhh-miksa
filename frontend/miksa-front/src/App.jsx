
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'


import { ProfilePage } from './pages/ProfilePage.jsx'
import { PermisionRequestPage } from './pages/PermisionRequestPage.jsx'
import { Employees } from './pages/Employees.jsx'
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
            <Route path='/solicitudes' element={<PermisionRequestPage />} />
            <Route path='/empleados' element={<Employees />} />
            <Route path='/logout' element={<LogoutButton />} />
          </Route>
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
