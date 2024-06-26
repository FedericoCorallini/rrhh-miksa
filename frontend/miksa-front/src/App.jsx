
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginButton from './components/LoginButton.jsx'
import LogoutButton from './components/LogoutButton.jsx'
import { Profile } from './pages/Profile.jsx'
import { Permision } from './pages/Permision.jsx'
import { PermisionRequest } from './pages/PermisionRequest.jsx'
import { NavBar } from './components/NavBar.jsx'
import { Employees } from './pages/Employees.jsx'

function App() {

  return (
    <>
      
      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route path='/' element={<LoginButton />} /> 
          <Route path='/login' element={<LoginButton />} />
          <Route path='/perfil/:id' element={<Profile />} />
          <Route path='/permisos' element={<Permision />} />
          <Route path='/solicitudes' element={<PermisionRequest />} />
          <Route path='/empleados' element={<Employees />} />
          <Route path='/logout' element={<LogoutButton />} />
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
