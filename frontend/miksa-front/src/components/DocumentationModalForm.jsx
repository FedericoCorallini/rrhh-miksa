import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { postDocument, postFile } from '../utils/Axios';
import { styled } from '@mui/material/styles';

export const DocumentationModalForm = ({ employeeId, handleClose, reload, setDoc, setFile }) => {
  const [data, setData] = useState({ employee: employeeId || null, documentation_type: '', description: '' });
  const [file, setFileState] = useState();
  const [docId, setDocId] = useState(0);

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
      setFileState(file);
      if (setFile) setFile(file);
      console.log('Archivo cargado:', file);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setDoc) {
      setDoc(data);
      handleClose();
    } else {
      const response = await postDocument(data);
      setDocId(response.data.id);
    }
  };

  useEffect(() => {
    if (docId !== 0) {
      const fileData = new FormData();
      fileData.append('file', file);
      postFile(fileData, docId);
      handleClose();
      if (reload) reload();
    }
  }, [docId]);

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
          {setDoc ? (
            [
              <MenuItem key="Permiso" value="Permiso">Permiso</MenuItem>,
              <MenuItem key="Retraso" value="Retraso">Retraso</MenuItem>
            ]
          ) : (
            [
              <MenuItem key="DDJJ" value="DDJJ">DDJJ</MenuItem>,
              <MenuItem key="Permiso" value="Permiso">Permiso</MenuItem>,
              <MenuItem key="Retraso" value="Retraso">Retraso</MenuItem>
            ]
          )}
        </Select>
      </FormControl>
      <Button component="label" variant="contained">
        Archivo
        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
      </Button>
      <Button type="submit" variant="contained">
        Guardar
      </Button>
    </Box>
  );
};