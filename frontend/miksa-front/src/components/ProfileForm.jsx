import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BasicDatePicker } from "./BasicDatePicker";
import { Button } from "@mui/material";
import { postEmployee, putEmployee } from "../utils/Axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'

export const ProfileForm = ({ profile }) => {
  const [data, setData] = useState(profile);
  const [errors, setErrors] = useState(profile);
  const { user } = useAuth0();

  useEffect(() => {
    setData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
       if (["dni", "cuil", "cell_phone_number", "home_phone_number"].includes(name)) {
          if (!/^\d*$/.test(value)) return;
        }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleDateChange = (name, date) => {
    setData((prevData) => ({
      ...prevData,
      [name]: date.target.value,
    }));
  };

  const validateField = (fieldName, value) => {
      let tempErrors = { ...errors };

      switch (fieldName) {
        case 'firstname':
          tempErrors.firstname = value ? '' : 'El nombre es obligatorio';
          break;
        case 'lastname':
          tempErrors.lastname = value ? '' : 'El apellido es obligatorio';
          break;
        case 'dni':
          tempErrors.dni = value ? '' : 'El DNI es obligatorio';
          break;
        case 'cuil':
          tempErrors.cuil = value ? '' : 'El CUIL es obligatorio';
          break;
        case 'cell_phone_number':
          tempErrors.cell_phone_number = value ? '' : 'El celular es obligatorio';
          break;
        case 'home_phone_number':
                  tempErrors.home_phone_number = value ? '' : 'El telefono es obligatorio';
          break;
        case 'email':
          if (!value) {
            tempErrors.email = 'El email es obligatorio';
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            tempErrors.email = 'El email no es válido';
          } else {
            tempErrors.email = '';
          }
          break;
        case 'marital_status':
            tempErrors.marital_status = value ? '' : 'El estado civil es obligatorio';
            break;
        case 'working_hours':
            tempErrors.working_hours = value ? '' : 'El horario laboral es obligatorio';
            break;
        case 'nationality':
            tempErrors.nationality = value ? '' : 'La nacionalidad es obligatoria';
            break;
        case 'gender':
            tempErrors.gender = value ? '' : 'El género es obligatorio';
             break;
        case 'job_position':
            tempErrors.job_position = value ? '' : 'El puesto laboral es obligatorio';
            break;

        default:
          break;
      }

      setErrors(tempErrors);
    };

  const validate = () => {
      let tempErrors = {};

      tempErrors.firstname = data.firstname ? '' : 'El nombre es obligatorio';
      tempErrors.lastname = data.lastname ? '' : 'El apellido es obligatorio';
      tempErrors.dni = data.dni ? '' : 'El DNI es obligatorio';
      tempErrors.cuil = data.cuil ? '' : 'El CUIL es obligatorio';
      tempErrors.cell_phone_number = data.cell_phone_number ? '' : 'El celular es obligatorio';
      tempErrors.home_phone_number = data.home_phone_number ? '' : 'El telefono es obligatorio';
      tempErrors.marital_status = data.marital_status ? '' : 'El estado civil es obligatorio';
      tempErrors.email = data.email ? '' : 'El email es obligatorio';
      if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
         tempErrors.email = 'El email no es válido';
      }
      tempErrors.working_hours = data.working_hours ? '' : 'El horario laboral es obligatorio';
      tempErrors.nationality = data.nationality ? '' : 'La nacionalidad es obligatoria';
      tempErrors.gender = data.gender ? '' : 'El género es obligatorio';
      tempErrors.job_position = data.job_position ? '' : 'El puesto laboral es obligatorio';

      setErrors(tempErrors);

      return Object.values(tempErrors).every((x) => x === '');
    };

  const isFormValid = () => {

    return (
      data.firstname &&
      data.lastname &&
      /^[0-9]+$/.test(data.dni) &&
      /^[0-9]+$/.test(data.cuil) &&
      /^[0-9]+$/.test(data.cell_phone_number) &&
      /^[0-9]+$/.test(data.home_phone_number) &&
      data.email &&
      data.marital_status &&
      data.working_hours &&
      data.nationality &&
      data.job_position &&
      data.gender &&
      data.date_of_birth
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    if (data.id === undefined) {
      postEmployee(data);
    } else {
      putEmployee(data.id, data);
    }
    } else {
        console.log('Errores en el formulario')
        }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          label="Cuil"
          variant="standard"
          name="cuil"
          value={data.cuil || ""}
          onChange={handleChange}
          error={!!errors.cuil}
          helperText={errors.cuil}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          label="Celular"
          variant="standard"
          name="cell_phone_number"
          value={data.cell_phone_number || ""}
          onChange={handleChange}
          error={!!errors.cell_phone_number}
          helperText={errors.cell_phone_number}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          label="Telefono"
          variant="standard"
          name="home_phone_number"
          value={data.home_phone_number || ""}
          onChange={handleChange}
          error={!!errors.home_phone_number}
          helperText={errors.home_phone_number}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
        <TextField
          label="Estado civil"
          variant="standard"
          name="marital_status"
          value={data.marital_status || ""}
          onChange={handleChange}
          error={!!errors.marital_status}
          helperText={errors.marital_status}
        />
        <TextField
          label="Horario laboral"
          variant="standard"
          name="working_hours"
          value={data.working_hours || ""}
          onChange={handleChange}
          error={!!errors.working_hours}
          helperText={errors.working_hours}
        />
        <TextField
          label="Nacionalidad"
          variant="standard"
          name="nationality"
          value={data.nationality || ""}
          onChange={handleChange}
          error={!!errors.nationality}
          helperText={errors.nationality}
        />
        <TextField
          label="Puesto laboral"
          variant="standard"
          name="job_position"
          value={data.job_position || ""}
          onChange={handleChange}
          error={!!errors.job_position}
          helperText={errors.job_position}
        />
        <TextField
          label="Genero"
          variant="standard"
          name="gender"
          value={data.gender || ""}
          onChange={handleChange}
          error={!!errors.gender}
          helperText={errors.gender}
        />
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
          disabled={!isFormValid()}
          onClick={() => {
                Swal.fire({
                  title: 'Guardado exitoso',
                  text: 'El formulario se ha enviado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
              }}
        >
          Guardar
        </Button>
       )}

    </Box>
  );
};
