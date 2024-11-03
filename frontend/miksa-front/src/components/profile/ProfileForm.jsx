import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from './BasicDatePicker';
import { Button } from '@mui/material';
import { postEmployee, putEmployee } from '../utils/Axios';

export const ProfileForm = ({ profile }) => {
  const [data, setData] = useState(profile);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.id === undefined){
      postEmployee(data)    
    }
    else{
      putEmployee(data.id, data)
    }

  };

  return (

    <Box 
    component="form"
    onSubmit={handleSubmit}>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Nombre"
          variant="standard"
          name="firstname"
          value={data.firstname || ''}
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          variant="standard"
          name="lastname"
          value={data.lastname || ''}
          onChange={handleChange}
        />
        <TextField
          label="Dni"
          variant="standard"
          name="dni"
          value={data.dni || ''}
          onChange={handleChange}
        />
        <TextField
          label="Cuil"
          variant="standard"
          name="cuil"
          value={data.cuil || ''}
          onChange={handleChange}
        />
        <TextField
          label="Celular"
          variant="standard"
          name="cell_phone_number"
          value={data.cell_phone_number || ''}
          onChange={handleChange}
        />
        <TextField
          label="Telefono"
          variant="standard"
          name="home_phone_number"
          value={data.home_phone_number || ''}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="standard"
          name="email"
          value={data.email || ''}
          onChange={handleChange}
        />
        <TextField
          label="Estado civil"
          variant="standard"
          name="marital_status"
          value={data.marital_status || ''}
          onChange={handleChange}
        />
        <TextField
          label="Horario laboral"
          variant="standard"
          name="working_hours"
          value={data.working_hours || ''}
          onChange={handleChange}
        />
        <TextField
          label="Nacionalidad"
          variant="standard"
          name="nationality"
          value={data.nationality || ''}
          onChange={handleChange}
        />
        <TextField
          label="Puesto laboral"
          variant="standard"
          name="job_position"
          value={data.job_position || ''}
          onChange={handleChange}
        />
        <TextField
          label="Genero"
          variant="standard"
          name="gender"
          value={data.gender || ''}
          onChange={handleChange}
        />
        <BasicDatePicker
          label="Fecha de nacimiento"
          date={data.date_of_birth}
          onChange={(date) => handleDateChange('date_of_birth', date)}
        />
        <BasicDatePicker
          label="Fecha de admisión"
          date={data.date_of_admission}
          onChange={(date) => handleDateChange('date_of_admission', date)}
        />
      </Box>
      <Button sx={{ mt: '15px' }} type="submit" variant="contained" size="large" >
        Guardar
      </Button>
    </Box>
  );
};
