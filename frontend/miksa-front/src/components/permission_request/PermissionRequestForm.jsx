import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BasicDatePicker } from '../BasicDatePicker';
import { Button } from '@mui/material';
import BasicTimePicker from '../BasicTimePicker';
import { postDocument, postFile, postPermission } from '../../utils/Axios';
import dayjs from 'dayjs';
import { DocumentationRequestModal } from './DocumentationRequestModal';

export const PermissionRequestForm = () => {
  const [data, setData] = useState({ 
    employee_id: 1,
    reason: '',
    details: '',
    start_date: dayjs(), 
    end_date: dayjs(), 
    start_time: dayjs().format('HH:mm'), 
    end_time: dayjs().format('HH:mm')});

  const [doc, setDoc] = useState({
    employee: null,
    absence_permission: null
  })

  // const [file, setFile] = useState();
  // const [docId, setDocId] = useState(0);

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // const setDocIds = (permissionId, employeeId) => {
  //   setDoc((prevData) => ({
  //     ...prevData,
  //     absence_permission: permissionId,
  //     employee: employeeId
  //   }));
  // };

  const handleDateChange = (name, date) => {
    setData((prevData) => ({
      ...prevData,
      [name]: date.target.value,
    }));
  };

  const handleTimeChange = (name, time) => {
    setData((prevData) => ({
      ...prevData,
      [name]: time.format('HH:mm'),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postPermission(data)
    console.log(response.data.id);
    //setDocIds(response.data.id, response.data.employee_id)

  };

  // useEffect(() => {
  //   if (doc.absence_permission !== null && doc.employee !== null) {
  //     postDoc()
  //   }
  // }, [doc]);

  // const postDoc = async () =>{
  //     const response = await postDocument(doc)
  //     setDocId(response.data.id)
  // }

  // useEffect(() => {
  //   if (docId !== 0) {
  //     const fileData = new FormData()
  //     fileData.append('file', file)
  //     postFile(fileData, docId)
  //   }
  // }, [docId]);

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
      />
      <TextField
        label="Detalles"
        variant="standard"
        name="details"
        value={data.details || ''}
        onChange={handleChange}
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
      {/* <DocumentationRequestModal setDoc={setDoc} setFile={setFile}></DocumentationRequestModal> */}
      <Button sx={{ flexBasis: 'calc(27.5ch)' }} type="submit" variant="contained">
        Enviar
      </Button>
 
    </Box>
  );
};
