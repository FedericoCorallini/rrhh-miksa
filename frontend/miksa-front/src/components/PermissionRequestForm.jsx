import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from './BasicDatePicker';
import { Button } from '@mui/material';
import BasicTimePicker from './BasicTimePicker';
import { postDocument, postFile, postPermission } from '../utils/Axios';
import dayjs from 'dayjs';
import { DocumentationRequestModal } from './DocumentationRequestModal';

export const PermissionRequestForm = ({onClose, updateRequests}) => {
  const [data, setData] = useState({ 
    employee_id: 1,
    reason: '',
    details: '',
    start_date: null, 
    end_date: null, 
    start_time: null, 
    end_time: null});

  const [doc, setDoc] = useState({
    employee: null,
    absence_permission: null
  })

  const [file, setFile] = useState();
  const [docId, setDocId] = useState(0);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const setDocIds = (permissionId, employeeId) => {
    setDoc((prevData) => ({
      ...prevData,
      absence_permission: permissionId,
      employee: employeeId
    }));
  };

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleDocumentSave = () => {
    setNotification('*Documento cargado correctamente');
  };

  const handleDateChange = (name, date) => {
    const dateValue = date && date.target ? date.target.value : date;
    const parsedDate = dayjs(dateValue);
    if (!parsedDate.isValid()) {
      console.error('Fecha invalida', date);
      return;
    }
    setData((prevData) => ({
      ...prevData,
      [name]: parsedDate.format('YYYY-MM-DD'),
    }));
  };

  const handleTimeChange = (name, time) => {
    setData((prevData) => ({
      ...prevData,
      [name]: time.format('HH:mm'),
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!data.reason) tempErrors.reason = '*El campo es obligatorio';
    if (!data.details) tempErrors.details = '*El campo es obligatorio';
  
    const startDateTime = dayjs(`${data.start_date} ${data.start_time}`, 'YYYY-MM-DD HH:mm');
    const endDateTime = dayjs(`${data.end_date} ${data.end_time}`, 'YYYY-MM-DD HH:mm');
    
    console.log(startDateTime, endDateTime)

    if (!startDateTime.isValid() || !endDateTime.isValid()) {
      tempErrors.dateTime = '*Fecha y hora inválidas';
    } else if (startDateTime.isAfter(endDateTime)) {
      tempErrors.dateTime = '*La fecha y hora de inicio deben ser anteriores a la fecha y hora de fin';
    }
  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      start_time: dayjs().format('HH:mm'),
      end_time: dayjs().format('HH:mm'),
    }));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (hasSubmitted) {
      validate();
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!validate()) return;
    console.log('Datos antes de enviar:', data); // Verifica los datos antes de enviar
    try {
      const response = await postPermission(data);
      if (response && response.data && response.data.id) {
        console.log(response.data.id);
        setDocIds(response.data.id, response.data.employee_id);
        updateRequests();
        console.log('Solicitud enviada:', data);
        onClose();
      } else {
        console.error('Error en la respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  useEffect(() => {
    if (doc.absence_permission !== null && doc.employee !== null) {
      postDoc()
    }
  }, [doc]);

  const postDoc = async () =>{
      const response = await postDocument(doc)
      setDocId(response.data.id)
  }

  useEffect(() => {
    if (docId !== 0) {
      const fileData = new FormData()
      fileData.append('file', file)
      postFile(fileData, docId)
      handleDocumentSave();
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
      />
      <BasicDatePicker
        label="Fecha de finalizacion"
        date={data.end_date}
        onChange={(date) => handleDateChange('end_date', date)}
      />
      <BasicTimePicker
        label="Hora de inicio"
        time={data.start_time}
        onChange={(time) => handleTimeChange('start_time', time)}
      />
      <BasicTimePicker
        label="Hora de finalizacion"  
        time={data.end_time}
        onChange={(time) => handleTimeChange('end_time', time)}
      />
      {errors.dateTime && (
        <span style={{ color: '#d32f2f', fontSize:'12px', padding:'0', margin: '0 0 20px 0', width:'100%', textAlign:'center'}}>{errors.dateTime}</span>
        )}
      <DocumentationRequestModal setDoc={setDoc} setFile={setFile}></DocumentationRequestModal>
      <Button sx={{ flexBasis: 'calc(27.5ch)' }} type="submit" variant="contained">
        Enviar
      </Button>
      {notification && <div className="notification" style={{color: 'green', fontSize:'12px', padding:'0', margin: '0 0px 20px 10px', width:'100%'}}>{notification}</div>}
    </Box>
  );
};
