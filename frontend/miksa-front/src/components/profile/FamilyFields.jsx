import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { getRelatives, addRelative, updateRelative, deleteRelative } from "../../utils/Axios";
import { Snackbar, Alert, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { ConfirmDialog } from "../ConfirmDialog";
import { BasicDatePicker } from "../BasicDatePicker";

export const FamilyFields = ({ employeeId }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [relatives, setRelatives] = useState([]);
  const [form, setForm] = useState({
    employee_id: employeeId,
    firstname: "",
    lastname: "",
    relation: "",
    lives: true,
    date_of_birth: "",
    coexists: true,
    gender: ""
  });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const { user } = useAuth0();

  useEffect(() => {
    fetchRelatives();
  }, []);

  const fetchRelatives = async () => {
    try {
      const response = await getRelatives(employeeId);
      setRelatives(response.data);
    } catch (error) {
      setAlert({ open: true, message: "Error al cargar los familiares", severity: "error" });
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date_of_birth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateRelative(form.id, form);
        setAlert({ open: true, message: "Familiar actualizado con éxito", severity: "success" });
      } else {
        await addRelative({ ...form, employeeId });
        setAlert({ open: true, message: "Familiar agregado con éxito", severity: "success" });
      }
      fetchRelatives();
      setForm({ employee_id: employeeId, firstname: "", lastname: "", relation: "", lives: true, date_of_birth: "", coexists: true, gender: "" });
    } catch (error) {
      setAlert({ open: true, message: "Error al guardar los datos", severity: "error" });
    }
  };

  const handleEdit = (relative) => {
    setForm(relative);
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: "", severity: "success" });
  };

  const handleOpenConfirmDialog = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const handleConfirmDelete = async () => {
    try {
      await deleteRelative(deleteId);
      setAlert({ open: true, message: "Familiar eliminado con éxito", severity: "success" });
      fetchRelatives();
    } catch (error) {
      setAlert({ open: true, message: "Error al eliminar el familiar", severity: "error" });
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, p: 3, alignItems: "start" }}>
      {/* Lista de familiares con más información */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h6">Familiares</Typography>
        <Box component="ul" sx={{ p: 0, listStyle: "none" }}>
          {relatives.map((relative) => (
            <Box component="li" key={relative.id} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="body1" sx={{ color: user && user["roles/roles"] && (user["roles/roles"].includes("admin") || user["roles/roles"].includes("gerente")) ? "inherit" : "gray" }}>
                <strong>{relative.firstname} {relative.lastname}</strong> ({relative.relation}) - {relative.gender}<br />
                Nacimiento: {relative.date_of_birth} - Vive: {relative.lives ? "Sí" : "No"} - Convive: {relative.coexists ? "Sí" : "No"}
              </Typography>
              {user && user["roles/roles"] && (user["roles/roles"].includes("admin") || user["roles/roles"].includes("gerente")) && (
              <Box sx={{ mt: 1 }}>
                <Button size="small" onClick={() => handleEdit(relative)}>Editar</Button>
                <Button size="small" color="error" onClick={() => handleOpenConfirmDialog(relative.id)}>Eliminar</Button>
              </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Formulario más compacto */}
      {user && user["roles/roles"] && (user["roles/roles"].includes("admin")) && (
        <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, p: 3, border: "1px solid #ddd", borderRadius: 2, bgcolor: "#f9f9f9" }}>
          <Typography variant="h6">{form.id ? "Editar Familiar" : "Agregar Familiar"}</Typography>
          <TextField fullWidth name="firstname" label="Nombre" variant="standard" value={form.firstname} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth name="lastname" label="Apellido" variant="standard" value={form.lastname} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField select fullWidth name="gender" label="Género" variant="standard" value={form.gender} onChange={handleChange} required sx={{ mb: 2 }}>
            <MenuItem value="MASCULINO">Masculino</MenuItem>
            <MenuItem value="FEMENINO">Femenino</MenuItem>
          </TextField>
          <TextField select fullWidth name="relation" label="Relación" variant="standard" value={form.relation} onChange={handleChange} required sx={{ mb: 2 }}>
            <MenuItem value="PADRE">Padre</MenuItem>
            <MenuItem value="MADRE">Madre</MenuItem>
            <MenuItem value="HIJO">Hijo</MenuItem>
            <MenuItem value="HIJA">Hija</MenuItem>
            <MenuItem value="PAREJA">Concubino</MenuItem>
          </TextField>
          <BasicDatePicker
            label="Fecha de Nacimiento"
            date={form.date_of_birth}
            onChange={handleDateChange}
            required
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={form.lives} onChange={handleChange} name="lives" />}
              label="Vive"
            />
            <FormControlLabel
              control={<Checkbox checked={form.coexists} onChange={handleChange} name="coexists" />}
              label="Convive"
            />
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            {form.id ? "Actualizar" : "Agregar"}
          </Button>
        </Box>
      )}  
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar este familiar?"
      />
      {/* Snackbar Alert */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};