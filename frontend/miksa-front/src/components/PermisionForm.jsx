import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from './BasicDatePicker';
import { Button } from '@mui/material';
import BasicTimePicker from './BasicTimePicker';
import dayjs from 'dayjs';

export const PermisionForm = ({ permision }) => {
  const [data, setData] = useState(permision);

  useEffect(() => {
    setData(permision);
    console.log(permision)
  }, [permision]);

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
      [name]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como enviar los datos al backend.
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField
        label="Empleado"
        variant="standard"
        name="employee"
        value={data.permission.employee_name || ''}
        onChange={handleChange}
      />
      <TextField
        label="Puesto laboral"
        variant="standard"
        name="position"
        value={data.permission.employee_position || ''}
        onChange={handleChange}
      />
      <TextField
        label="Motivo"
        variant="standard"
        name="reason"
        value={data.permission.reason || ''}
        onChange={handleChange}
      />
      <TextField
        label="Detalles"
        variant="standard"
        name="details"
        value={data.permission.details || ''}
        onChange={handleChange}
      />
     
      <BasicDatePicker
        label="Fecha de inicio"
        date={data.permission.start_date}
        onChange={(date) => handleDateChange('date_of_birth', date)}
      />
      <BasicDatePicker
        label="Fecha de finalizacion"
        date={data.permission.end_date}
        onChange={(date) => console.log(date)}
      />
      <BasicTimePicker
        label="Hora de inicio" 
        time={data.permission.start_time} 
        onChange={(time) => handleTimeChange('end_time', time)}
      />
      <BasicTimePicker
        label="Hora de finalizacion" 
        time={data.permission.end_time} 
     
      />
      <Button sx={{ flexBasis: 'calc(50ch + 55px)' }} type="submit" variant="contained">
        Descargar documentacion
      </Button>
      <Button sx={{ flexBasis: 'calc(25ch + 20px)' }} type="submit" variant="contained">
        Aprobar
      </Button>
      <Button sx={{ flexBasis: 'calc(25ch + 20px)' }} type="submit" variant="contained">
        Rechazar
      </Button>
    </Box>
  );
};
