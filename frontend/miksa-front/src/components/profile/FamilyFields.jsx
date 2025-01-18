import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui//material/TextField';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

export const FamilyFields = ({ profile }) => {
  const initialData = profile || { padre: '', madre: '', hijos: [''] };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({ padre: '', madre: '', hijos: [''] });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [profile]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (!/^[a-zA-Z\s]*$/.test(value)) return;

    setIsModified(true);

    if (name === 'hijos') {
      const newHijos = [...data.hijos];
      newHijos[index] = value;
      setData((prevData) => ({
        ...prevData,
        hijos: newHijos,
      }));
      validateField(name, value, index);
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      validateField(name, value);
    }
  };

  const validateField = (fieldName, value, index) => {
    let tempErrors = { ...errors };

    if (fieldName === 'hijos') {
      const newHijosErrors = [...tempErrors.hijos];
      newHijosErrors[index] = /^[a-zA-Z\s]*$/.test(value) ? '' : 'Solo se permite texto';
      tempErrors.hijos = newHijosErrors;
    } else {
      tempErrors[fieldName] = /^[a-zA-Z\s]*$/.test(value) ? '' : 'Solo se permite texto';
    }

    setErrors(tempErrors);
  };

  const validate = (dataToValidate) => {
    let tempErrors = {};

    tempErrors.padre = /^[a-zA-Z\s]*$/.test(dataToValidate.padre) ? '' : 'Solo se permite texto';
    tempErrors.madre = /^[a-zA-Z\s]*$/.test(dataToValidate.madre) ? '' : 'Solo se permite texto';
    tempErrors.hijos = dataToValidate.hijos.map((hijo) =>
      hijo.trim() === '' || /^[a-zA-Z\s]*$/.test(hijo) ? '' : 'Solo se permite texto'
    );

    return tempErrors;
  };

  const isFormValid = () => {
    return (
      /^[a-zA-Z\s]*$/.test(data.padre) &&
      /^[a-zA-Z\s]*$/.test(data.madre) &&
      data.hijos.every((hijo) => hijo.trim() === '' || /^[a-zA-Z\s]*$/.test(hijo))
    );
  };

  const areAllChildrenComplete = () => {
    return data.hijos.every((hijo) => hijo.trim() !== '');
  };

  const handleAddHijo = () => {
    setData((prevData) => ({
      ...prevData,
      hijos: [...prevData.hijos, ''],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      hijos: [...prevErrors.hijos, ''],
    }));
  };

  const hasDataChanged = () => {
    const filteredInitialData = {
      ...initialData,
      hijos: initialData.hijos.filter((hijo) => hijo.trim() !== ''),
    };
    const filteredCurrentData = {
      ...data,
      hijos: data.hijos.filter((hijo) => hijo.trim() !== ''),
    };
    return JSON.stringify(filteredInitialData) !== JSON.stringify(filteredCurrentData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasDataChanged()) {
      Swal.fire({
        title: 'Error',
        text: 'No se han realizado cambios en el formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const filteredData = {
      ...data,
      padre: data.padre.trim() === '' ? null : data.padre,
      madre: data.madre.trim() === '' ? null : data.madre,
      hijos: data.hijos.filter((hijo) => hijo.trim() !== ''),
    };
    console.log(filteredData);
    const validationErrors = validate(filteredData);
    setErrors(validationErrors);

    if (
      Object.values(validationErrors).filter((error) => !Array.isArray(error)).every((x) => x === '') &&
      validationErrors.hijos.every((x) => x === '')
    ) {
      try {
        // GUARDAR LOS DATOS
        Swal.fire({
          title: 'Guardado exitoso',
          text: 'El formulario se ha enviado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } catch (error) {
        console.error('Error al guardar los datos:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al guardar los datos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      console.log('Errores en el formulario');
      Swal.fire({
        title: 'Error',
        text: 'Error en el formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Padre"
          variant="standard"
          name="padre"
          value={data.padre || ""}
          onChange={handleChange}
          error={!!errors.padre}
          helperText={errors.padre}
        />
        <TextField
          label="Madre"
          variant="standard"
          name="madre"
          value={data.madre || ""}
          onChange={handleChange}
          error={!!errors.madre}
          helperText={errors.madre}
        />
        {data.hijos.map((hijo, index) => (
          <TextField
            key={index}
            label={`Hijo/a`}
            variant="standard"
            name="hijos"
            value={hijo}
            onChange={(e) => handleChange(e, index)}
            error={!!errors.hijos[index]}
            helperText={errors.hijos[index]}
          />
        ))}
        <Button
          onClick={handleAddHijo}
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!areAllChildrenComplete()}
        >
          Agregar Hijo/a
        </Button>
      </Box>

      <Button
        sx={{ mt: "15px" }}
        type="submit"
        variant="contained"
        size="large"
        disabled={!isModified || !isFormValid()}
      >
        Guardar
      </Button>
    </Box>
  );
};