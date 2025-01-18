import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from './BasicDatePicker';
import { Button } from '@mui/material';
import BasicTimePicker from './BasicTimePicker';
import { postDocument, postFile, postPermission } from '../utils/Axios';
import dayjs from 'dayjs';
import { DocumentationModalForm } from './DocumentationModalForm';
import Modal from '@mui/material/Modal'; // Importar Modal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PermissionRequestModalForm = ({onClose, updateRequests}) => {
  const [data, setData] = useState({ 
    employee_id: 1,
    reason: '',
    details: '',
    start_date: null, 
    end_date: null, 
    start_time: null, 
    end_time: null
  });
/*
  const [doc, setDoc] = useState({
    employee: null,
    absence_permission: null
  })

  const [file, setFile] = useState();
  const [docId, setDocId] = useState(0);
*/
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
/*
  const setDocIds = (permissionId, employeeId) => {
    setDoc((prevData) => ({
      ...prevData,
      absence_permission: permissionId,
      employee: employeeId
    }));
  };
*/
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

const isFormComplete = () => {
  return data.reason && data.details && data.start_date && data.end_date && data.start_time && data.end_time;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!validate()) return;
    console.log('Datos antes de enviar:', data); // Verifica los datos antes de enviar
    try {
      const response = await postPermission(data);
      if (response && response.data && response.data.id) {
        Swal.fire({
          title: 'Guardado exitoso',
          text: 'El formulario se ha enviado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        updateRequests();
        onClose();
      } else {
        console.error('Error en la respuesta del servidor:', response);
        updateRequests();
        onClose();
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      updateRequests();
      onClose();
    }
  };
/*
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
    }
  }, [docId]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
*/
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

    {/* <DocumentationRequestModal setDoc={setDoc} setFile={setFile}></DocumentationRequestModal> */}
    <Button sx={{ flexBasis: 'calc(27.5ch)' }} type="submit" variant="contained" disabled={!isFormComplete()}>
      Enviar
    </Button>

  </Box>
  );
};