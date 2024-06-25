import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const DocumentationRequestForm = ({handleClose, setDoc}) => {
  const [data, setData] = useState({ id_absence_permission: null, documentation_type: '', description: '' });

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

  const onButtonClick = (e) => {
    e.preventDefault();
    setDoc(data)
    handleClose()
 
  };

  return (
    <Box
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
          <MenuItem value={"PERMISO"}>Permiso</MenuItem>
          <MenuItem value={"RETRASO"}>Retraso</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">
        Cargar documento
      </Button>
      <Button onClick={onButtonClick} variant="contained">
        Guardar
      </Button>
    </Box>
  );
};
