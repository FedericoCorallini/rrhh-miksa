import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { postDocument } from '../utils/Axios';

export const DocumentationForm = ({employeeId}) => {
  const [data, setData] = useState({ employee: employeeId, documentation_type: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      documentation_type: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDocument(data);
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
        label="Descripcion"
        variant="standard"
        name="description"
        value={data.description || ''}
        onChange={handleChange}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Tipo de documento</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={data.documentation_type || ''}
          onChange={handleSelectChange}
          label="Tipo de documento"
        >
          <MenuItem value={"DDJJ"}>DDJJ</MenuItem>
          <MenuItem value={"Permiso"}>Permiso</MenuItem>
          <MenuItem value={"Retraso"}>Retraso</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">
        Cargar documento
      </Button>
      <Button type="submit" variant="contained">
        Guardar
      </Button>
    </Box>
  );
};
