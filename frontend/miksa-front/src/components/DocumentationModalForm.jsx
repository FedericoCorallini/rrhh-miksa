import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { postDocument, postFile } from '../utils/Axios';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

export const DocumentationModalForm = ({ employeeId, handleClose, isPermissionMode, permissionId }) => {
  const [dataPermission, setDataPermission] = useState({ employee: employeeId, documentation_type: '', description: '', absence_permission: null });
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
    setDataPermission((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSelectChange = (e) => {
    setDataPermission((prevData) => ({
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
    if (!dataPermission.description) tempErrors.description = '*La descripción es obligatoria';
    if (!dataPermission.documentation_type) tempErrors.documentation_type = '*El tipo de documento es obligatorio';
    if (!file) tempErrors.file = '*Es obligatorio cargar un archivo';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isFormComplete = () => {
    return dataPermission.description && dataPermission.documentation_type && file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Asegúrate de que esto esté aquí para evitar la recarga de la página
    if (!validate()) return;

    try {
      let updatedDataPermission = { ...dataPermission };
      console.log("permiso elegido: ", permissionId);
      if (isPermissionMode && permissionId) {
        updatedDataPermission.absence_permission = permissionId;
      }
      console.log("después del isPermissionMode: ", updatedDataPermission);
      console.log("antes del post: ", updatedDataPermission);
      const response = await postDocument(updatedDataPermission);
      const newDocId = response.data.id; // Capturar el docId correctamente

      console.log("modal", newDocId);
      setDocId(newDocId);

      if (file) {
        const fileData = new FormData();
        fileData.append("file", file);
        console.log("Subiendo archivo para el documento:", newDocId);

        await postFile(fileData, newDocId);
      }

      Swal.fire({
        title: "Guardado exitoso",
        text: "El formulario se ha enviado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      handleClose();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar los datos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      handleClose();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: '1%',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Descripcion"
        variant="standard"
        name="description"
        value={dataPermission.description || ''}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
      />
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-standard-label">Tipo de documento</InputLabel>
        {isPermissionMode ? (
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={dataPermission.documentation_type || ''}
            onChange={handleSelectChange}
            label="Tipo de documento"
            error={!!errors.documentation_type}
          >
            <MenuItem value={"PERMISO"}>Permiso</MenuItem>
            <MenuItem value={"RETRASO"}>Retraso</MenuItem>
          </Select>
        ) : (
          <TextField
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value="DDJJ"
            InputProps={{
              readOnly: true,
            }}
          />
        )}
        {errors.documentation_type && (
          <Typography variant="caption" color="error">
            {errors.documentation_type}
          </Typography>
        )}
      </FormControl>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Button component="label" variant="contained" width="100%" startIcon={<FileUploadIcon />} sx={{ whiteSpace: 'nowrap' }}>
          Cargar archivo
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
      </Box>
      <Button type="submit" variant="contained" disabled={!isFormComplete()} startIcon={<SaveIcon />} sx={{ backgroundColor: '#5bbc5e', color: 'white', minWidth: '120px' }}>
        Guardar
      </Button>
    </Box>
  );
};