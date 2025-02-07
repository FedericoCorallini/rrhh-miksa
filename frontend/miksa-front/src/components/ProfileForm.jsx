import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BasicDatePicker } from "./BasicDatePicker";
import { Button, Snackbar, Alert, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { postEmployee, putEmployee } from "../utils/Axios";
import { useAuth0 } from "@auth0/auth0-react";

export const ProfileForm = ({ profile }) => {
  const [data, setData] = useState(profile);
  const { user } = useAuth0();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({}); // Estado para manejar los errores de validación

  useEffect(() => {
    setData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setData((prevData) => ({
      ...prevData,
      [name]: date.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Validaciones
    if (!data.firstname) newErrors.firstname = "El nombre es obligatorio";
    if (!data.lastname) newErrors.lastname = "El apellido es obligatorio";
    if (!data.dni) newErrors.dni = "El DNI es obligatorio";
    else if (!/^\d{8}$/.test(data.dni)) newErrors.dni = "El DNI debe tener 8 dígitos";
    
    if (!data.email) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "El formato del email es inválido";
    
    if (!data.cell_phone_number) newErrors.cell_phone_number = "El celular es obligatorio";
    
    // Validación de los campos de fecha (si son necesarios)
    if (!data.date_of_birth) newErrors.date_of_birth = "La fecha de nacimiento es obligatoria";
    if (!data.date_of_admission) newErrors.date_of_admission = "La fecha de admisión es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna si no hay errores
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      console.log("No se envio el formulario.")
      return; // Si hay errores, no enviar el formulario
    }

    let submitAction;
    if (data.id === undefined) {
      submitAction = postEmployee(data);
    } else {
      submitAction = putEmployee(data.id, data);
    }

    submitAction
      .then(() => {
        setIsSuccess(true);
        setOpenSnackbar(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setOpenSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  console.log(data);
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Datos Personales
      </Typography>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nombre"
          variant="standard"
          name="firstname"
          value={data.firstname || ""}
          onChange={handleChange}
          error={!!errors.firstname}
          helperText={errors.firstname}
        />
        <TextField
          label="Apellido"
          variant="standard"
          name="lastname"
          value={data.lastname || ""}
          onChange={handleChange}
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
        <TextField
          label="Dni"
          variant="standard"
          name="dni"
          value={data.dni || ""}
          onChange={handleChange}
          error={!!errors.dni}
          helperText={errors.dni}
        />
        <TextField
          label="Cuil"
          variant="standard"
          name="cuil"
          value={data.cuil || ""}
          onChange={handleChange}
        />
        <TextField
          label="Celular"
          variant="standard"
          name="cell_phone_number"
          value={data.cell_phone_number || ""}
          onChange={handleChange}
          error={!!errors.cell_phone_number}
          helperText={errors.cell_phone_number}
        />
        <TextField
          label="Telefono"
          variant="standard"
          name="home_phone_number"
          value={data.home_phone_number || ""}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="standard"
          name="email"
          value={data.email || ""}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
         <FormControl variant="standard" sx={{ m: 1, width: "25ch" }}>
          <InputLabel>Estado civil</InputLabel>
          <Select
            name="marital_status"
            value={data.marital_status || ""}
            onChange={handleChange}
            error={!!errors.marital_status}
          >
            <MenuItem value="soltero">Soltero</MenuItem>
            <MenuItem value="casado">Casado</MenuItem>
            <MenuItem value="divorciado">Divorciado</MenuItem>
            <MenuItem value="viudo">Viudo</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Horario laboral"
          variant="standard"
          name="working_hours"
          value={data.working_hours || ""}
          onChange={handleChange}
        />
        <TextField
          label="Nacionalidad"
          variant="standard"
          name="nationality"
          value={data.nationality || ""}
          onChange={handleChange}
        />
        <TextField
          label="Puesto laboral"
          variant="standard"
          name="job_position"
          value={data.job_position || ""}
          onChange={handleChange}
        />
        <FormControl variant="standard" sx={{ m: 1, width: "25ch" }}>
          <InputLabel>Genero</InputLabel>
          <Select
            name="gender"
            value={data.gender || ""}
            onChange={handleChange}
            error={!!errors.gender}
          >
            <MenuItem value="MASCULINO">Masculino</MenuItem>
            <MenuItem value="FEMENINO">Femenino</MenuItem>
          </Select>
        </FormControl>
        
        <BasicDatePicker
          label="Fecha de nacimiento"
          date={data.date_of_birth}
          onChange={(date) => handleDateChange("date_of_birth", date)}
        />
        <BasicDatePicker
          label="Fecha de admisión"
          date={data.date_of_admission}
          onChange={(date) => handleDateChange("date_of_admission", date)}
        />
      </Box>

      {user && user["roles/roles"] && user["roles/roles"].includes("admin") && (
        <Button
          sx={{ mt: "15px" }}
          type="submit"
          variant="contained"
          size="large"
        >
          Guardar
        </Button>
      )}

      {/* Snackbar de éxito o error */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={isSuccess ? "success" : "error"} sx={{ width: "100%" }}>
          {isSuccess ? "Los datos se guardaron correctamente." : "Hubo un error al guardar los datos."}
        </Alert>
      </Snackbar>
    </Box>
  );
};
