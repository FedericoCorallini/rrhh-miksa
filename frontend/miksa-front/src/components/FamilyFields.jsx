import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BasicDatePicker } from "./BasicDatePicker";
import { Button } from "@mui/material";
import Swal from 'sweetalert2';

export const FamilyFields = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    relationship: '',
    gender: '',
    livesWith: '',
    familyStatus: '',
    dateOfBirth: null,
    lives: '',
  });
  const [errors, setErrors] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]); // Lista para almacenar familiares

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      case 'relationship':
        tempErrors.relationship = value ? '' : 'El vínculo familiar es obligatorio';
        break;
      case 'gender':
        tempErrors.gender = value ? '' : 'El género es obligatorio';
        break;
      case 'livesWith':
        tempErrors.livesWith = value ? '' : 'Campo obligatorio';
        break;
      case 'lives':
        tempErrors.lives = value ? '' : 'Campo obligatorio';
        break;
      case 'dateOfBirth':
        tempErrors.dateOfBirth = value ? '' : 'La fecha de nacimiento es obligatoria';
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
    tempErrors.relationship = data.relationship ? '' : 'El vínculo familiar es obligatorio';
    tempErrors.gender = data.gender ? '' : 'El género es obligatorio';
    tempErrors.livesWith = data.livesWith ? '' : 'Campo obligatorio';
    tempErrors.lives = data.lives ? '' : 'Campo obligatorio';
    tempErrors.dateOfBirth = data.dateOfBirth ? '' : 'La fecha de nacimiento es obligatoria';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleAddFamilyMember = () => {
    if (validate()) {
      setFamilyMembers([...familyMembers, data]); // Añadir miembro a la lista
      setData({ // Limpiar el formulario
        firstname: '',
        lastname: '',
        relationship: '',
        gender: '',
        livesWith: '',
        lives: '',
        familyStatus: '',
        dateOfBirth: null,
      });
      Swal.fire({
        title: 'Familiar añadido',
        text: 'Puedes agregar otro familiar o guardar todos los datos.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleSaveAll = () => {
    if (familyMembers.length > 0 || validate()) {
      // Guardar la lista de familiares
      if (validate()) {
        setFamilyMembers([...familyMembers, data]); // Agregar el último familiar si el formulario tiene datos
      }
      Swal.fire({
        title: 'Todos los familiares guardados',
        text: 'Los datos de todos los familiares han sido guardados.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      setFamilyMembers([]); // Limpiar la lista de familiares después de guardar
    } else {
      console.log('Errores en el formulario');
    }
  };

  return (
    <Box component="form">
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
          label="Vínculo Familiar"
          variant="standard"
          name="relationship"
          value={data.relationship || ""}
          onChange={handleChange}
          error={!!errors.relationship}
          helperText={errors.relationship}
        />
        <TextField
          label="Sexo"
          variant="standard"
          name="gender"
          value={data.gender || ""}
          onChange={handleChange}
          error={!!errors.gender}
          helperText={errors.gender}
        />
        <TextField
          label="Convive"
          variant="standard"
          name="livesWith"
          value={data.livesWith || ""}
          onChange={handleChange}
          error={!!errors.livesWith}
          helperText={errors.livesWith}
        />
        <TextField
           label="Vive (Si/No)"
           variant="standard"
           name="lives"
           value={data.lives || ""}
           onChange={handleChange}
           error={!!errors.lives}
           helperText={errors.lives}
        />
        <BasicDatePicker
          label="Fecha de Nacimiento"
          date={data.dateOfBirth}
          onChange={(date) => handleDateChange("dateOfBirth", date)}
        />
      </Box>

      <Button
        sx={{ mt: "15px", mr: "10px" }}
        variant="outlined"
        size="large"
        onClick={handleAddFamilyMember}
      >
        Agregar otro familiar
      </Button>

      <Button
        sx={{ mt: "15px" }}
        variant="contained"
        size="large"
        onClick={handleSaveAll}
      >
        Guardar todos
      </Button>
    </Box>
  );
};






/*import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const FamilyFields = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Padre" variant="standard" />
      <TextField id="standard-basic" label="Madre" variant="standard" />
      <TextField id="standard-basic" label="Hijo" variant="standard" />


    </Box>
  );
}*/


