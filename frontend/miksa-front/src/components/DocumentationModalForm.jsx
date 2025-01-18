import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { postDocument, postFile } from '../utils/Axios';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

export const DocumentationModalForm = ({ employeeId, handleClose, reload }) => {
  const [data, setData] = useState({ employee: employeeId, documentation_type: '', description: '' });
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState(0);
  const [errors, setErrors] = useState({});

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: 'El archivo no debe pesar más de 5MB',
        }));
        setFile(null);
      } else {
        setFile(file);
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: '',
        }));
        console.log('Archivo cargado:', file);
      }
    }
  };

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
    if (!data.description) tempErrors.description = '*La descripción es obligatoria';
    if (!data.documentation_type) tempErrors.documentation_type = '*El tipo de documento es obligatorio';
    if (!file) tempErrors.file = '*Es obligatorio cargar un archivo';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isFormComplete = () => {
    return data.description && data.documentation_type && file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await postDocument(data);
      setDocId(response.data.id);
      Swal.fire({
        title: 'Guardado exitoso',
        text: 'El formulario se ha enviado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      handleClose();
      reload();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar los datos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      handleClose();
      reload();
    }
  };

  useEffect(() => {
    if (docId !== 0) {
      const fileData = new FormData();
      fileData.append('file', file);
      postFile(fileData, docId)
        .then(() => {
          handleClose();
          reload();
        })
        .catch((error) => {
          console.error('Error al subir el archivo:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al subir el archivo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }
  }, [docId, file, handleClose, reload]);

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
        error={!!errors.description}
        helperText={errors.description}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Tipo de documento</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={data.documentation_type || ''}
          onChange={handleSelectChange}
          label="Tipo de documento"
          error={!!errors.documentation_type}
        >
          <MenuItem value={"DDJJ"}>DDJJ</MenuItem>
          <MenuItem value={"Permiso"}>Permiso</MenuItem>
          <MenuItem value={"Retraso"}>Retraso</MenuItem>
        </Select>
        {errors.documentation_type && (
          <Typography variant="caption" color="error">
            {errors.documentation_type}
          </Typography>
        )}
      </FormControl>
      <Button component="label" variant="contained">
        Archivo
        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
      </Button>
      {file && (
        <Typography variant="caption" color="textSecondary">
          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </Typography>
      )}
      {errors.file && (
        <Typography variant="caption" color="error">
          {errors.file}
        </Typography>
      )}
      <Button type="submit" variant="contained" disabled={!isFormComplete()}>
        Guardar
      </Button>
    </Box>
  );
};