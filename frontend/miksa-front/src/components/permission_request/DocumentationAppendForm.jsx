import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import { postAllFile } from '../../utils/Axios';

export const DocumentationAppendForm = ({handleClose, id}) => {
  const [data, setData] = useState({ employee: 1, absence_permission: id, documentation_type: '', description: '' });
  const formData = new FormData()

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        formData.append('file', file)
        console.log('Archivo cargado:', file);
    }
  };

  const handleSelectChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      documentation_type: e.target.value,
    }));
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    formData.append('documentation', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    postAllFile(formData)
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
      <Button component="label" variant="contained" >
       Cargar Archivo
        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
      </Button>  
      <Button onClick={onButtonClick} variant="contained">
        Guardar
      </Button>
    </Box>
  );
};