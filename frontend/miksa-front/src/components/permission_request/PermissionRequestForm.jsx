import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from '../BasicDatePicker';
import { Button } from '@mui/material';
import BasicTimePicker from '../BasicTimePicker';
import { postDocument, postFile, postPermission } from '../../utils/Axios';
import dayjs from 'dayjs';
import { DocumentationRequestModal } from './DocumentationRequestModal';

export const PermissionRequestForm = ({ onSuccess, onError, handleClose, onUpdate }) => {
  const [data, setData] = useState({ 
    employee_id: sessionStorage.getItem('employeeId') || '', // Asegura que employee_id no sea null
    reason: '',
    details: '',
    start_date: dayjs(), 
    end_date: dayjs(), 
    start_time: dayjs().format('HH:mm'), 
    end_time: dayjs().format('HH:mm')
  });

  const [doc, setDoc] = useState({
    employee: null,
    absence_permission: null
  });

  const [file, setFile] = useState(null); // Inicializa file como null
  const [docId, setDocId] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const setDocIds = (permissionId, employeeId) => {
    setDoc((prevData) => ({
      ...prevData,
      absence_permission: permissionId,
      employee: employeeId
    }));
  };

  const handleDateChange = (name, date) => {
    setData((prevData) => ({
      ...prevData,
      [name]: date.format('YYYY-MM-DD'), // Asegura que la fecha se formatee correctamente
    }));
  };

  const handleTimeChange = (name, time) => {
    setData((prevData) => ({
      ...prevData,
      [name]: time.format('HH:mm'),
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!data.reason) newErrors.reason = "El motivo es obligatorio";
    if (!data.details) newErrors.details = "Los detalles son obligatorios";
    if (!data.start_date) newErrors.start_date = "La fecha de inicio es obligatoria";
    if (!data.end_date) newErrors.end_date = "La fecha de finalización es obligatoria";
    if (!data.start_time) newErrors.start_time = "La hora de inicio es obligatoria";
    if (!data.end_time) newErrors.end_time = "La hora de finalización es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      onError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      const response = await postPermission(data);
      setDocIds(response.data.id, response.data.employee_id);
      onSuccess("Solicitud enviada con éxito.");
      onUpdate(); // Llama a la función de actualización
      handleClose(); // Cierra el modal al enviar correctamente
    } catch (error) {
      onError("Error al enviar la solicitud.");
    }
  };

  useEffect(() => {
    if (doc.absence_permission !== null && doc.employee !== null && file) {
      postDoc();
    }
  }, [doc]);

  const postDoc = async () => {
    const response = await postDocument(doc);
    setDocId(response.data.id);
  };

  useEffect(() => {
    if (docId !== 0 && file) {
      const fileData = new FormData();
      fileData.append('file', file);
      postFile(fileData, docId);
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
        label="Motivo"
        variant="standard"
        name="reason"
        value={data.reason || ''}
        onChange={handleChange}
        error={!!errors.reason}
        helperText={errors.reason}
      />
      <TextField
        label="Detalles"
        variant="standard"
        name="details"
        value={data.details || ''}
        onChange={handleChange}
        error={!!errors.details}
        helperText={errors.details}
      />
      <BasicDatePicker
        label="Fecha de inicio"
        date={data.start_date}
        onChange={(date) => handleDateChange('start_date', date)}
        error={!!errors.start_date}
        helperText={errors.start_date}
      />
      <BasicDatePicker
        label="Fecha de finalización"
        date={data.end_date}
        onChange={(date) => handleDateChange('end_date', date)}
        error={!!errors.end_date}
        helperText={errors.end_date}
      />
      <BasicTimePicker
        label="Hora de inicio"
        time={data.start_time}
        onChange={(time) => handleTimeChange('start_time', time)}
        error={!!errors.start_time}
        helperText={errors.start_time}
      />
      <BasicTimePicker
        label="Hora de finalización"
        time={data.end_time}
        onChange={(time) => handleTimeChange('end_time', time)}
        error={!!errors.end_time}
        helperText={errors.end_time}
      />
      <DocumentationRequestModal setDoc={setDoc} setFile={setFile} />
      <Button sx={{ flexBasis: 'calc(27.5ch)' }} type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};