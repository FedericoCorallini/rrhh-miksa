import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from './BasicDatePicker';
import { Button } from '@mui/material';
import BasicTimePicker from './BasicTimePicker';
import { postPermission } from '../utils/Axios';
import dayjs from 'dayjs';
import SendIcon from '@mui/icons-material/Send';

export const PermissionRequestModalForm = ({setPermission , handleClose}) => {
  const [data, setData] = useState({
    employee_id: sessionStorage.getItem('employeeId'),
    reason: '',
    details: '',
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null
  });

  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
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
        setPermission(response.data);
        handleClose();
      } else {
        console.error('Error en la respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
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
        label="Fecha de finalización"
        date={data.end_date}
        onChange={(date) => handleDateChange('end_date', date)}
      />
      <BasicTimePicker
        label="Hora de inicio"
        time={data.start_time}
        onChange={(time) => handleTimeChange('start_time', time)}
      />
      <BasicTimePicker
        label="Hora de finalización"
        time={data.end_time}
        onChange={(time) => handleTimeChange('end_time', time)}
      />
      {errors.dateTime && (
        <span style={{ color: '#d32f2f', fontSize: '12px', padding: '0', margin: '0 0 20px 0', width: '100%', textAlign: 'center' }}>{errors.dateTime}</span>
      )}

      <Button sx={{ backgroundColor: "#5bbc5e", color: 'white', '&:hover': { backgroundColor: "#4caf50", } }} startIcon={<SendIcon />} type="submit" variant="contained" disabled={!isFormComplete()}>
        Enviar
      </Button>
    </Box>
  );
};