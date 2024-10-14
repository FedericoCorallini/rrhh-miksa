import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DocumentationRequestForm = ({handleClose, setDoc, setFile}) => {
  const [data, setData] = useState({ id_absence_permission: null, documentation_type: '', description: '' });
  const [errors, setErrors] = useState({});
  const [file, setFileState] = useState(null);
  const [fileName, setFileName] = useState('');

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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        setFileState(selectedFile);
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: '',
        }));
        console.log('Archivo cargado:', selectedFile);
    }
  };

  const handleSelectChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      documentation_type: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      documentation_type: '',
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!data.documentation_type) tempErrors.documentation_type = '*Seleccione el tipo de documento';
    if (!data.description) tempErrors.description = '*La descripción es obligatoria';
    if (!file) tempErrors.file = '*Debe subir un archivo';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    if (!validate()) return;
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
        error={!!errors.description}
        helperText={errors.description}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={!!errors.documentation_type}>
        <InputLabel id="demo-simple-select-standard-label">Tipo de documento</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={data.documentation_type || ''}
          onChange={handleSelectChange}
          label="Tipo de documento"
          error={!!errors.documentation_type}
        >
          <MenuItem value={"PERMISO"}>Permiso</MenuItem>
          <MenuItem value={"RETRASO"}>Retraso</MenuItem>
        </Select>
        {errors.documentation_type && (
          <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.documentation_type}</span>
        )}
      </FormControl>
      <Button component="label" variant="contained" style={{marginBottom:'0'}} >
       Cargar Archivo
        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
      </Button>
      {fileName && (
        <span style={{ margin: '0 0px 0px 10px', fontSize: '0.875rem',color:'grey' }}>{fileName}</span>
      )}
      {errors.file && (
        <span style={{color: '#d32f2f', fontSize:'12px', padding:'0', margin: '0 0px 20px 10px', width:'100%'}}>{errors.file}</span>
      )}
      <Button onClick={onButtonClick} variant="contained">
        Guardar
      </Button>
    </Box>
  );
};