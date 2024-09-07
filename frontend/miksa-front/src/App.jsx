import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Profile } from "./pages/Profile.jsx";
import { PermissionResponse } from "./pages/PermissionResponse.jsx";
import { PermissionRequest } from "./pages/PermissionRequest.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { Employees } from "./pages/Employees.jsx";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/perfil/:id" element={<Profile />} />
          <Route path="/permisos" element={<PermissionResponse />} />
          <Route path="/solicitudes" element={<PermissionRequest />} />
          <Route path="/empleados" element={<Employees />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
