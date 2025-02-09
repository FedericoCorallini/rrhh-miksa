import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BasicDatePicker } from "../BasicDatePicker";
import { Button } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { postEmployee, putEmployee } from "../../utils/Axios";
import { useAuth0 } from "@auth0/auth0-react";

// Componente reutilizable para TextField
const FormField = React.memo(({ label, name, rules, register, errors, select, children, readOnly, ...props }) => (
  <TextField
    label={label}
    {...register(name, rules)}
    error={!!errors[name]}
    helperText={errors[name]?.message}
    select={select}
    variant="standard"
    fullWidth
    InputLabelProps={{ shrink: true }}
    InputProps={{
      readOnly: readOnly,
      style: { color: readOnly ? 'gray' : 'inherit' }
    }}
    {...props}
  >
    {children}
  </TextField>
));

FormField.displayName = "FormField";

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  select: PropTypes.bool,
  children: PropTypes.node,
  readOnly: PropTypes.bool,
};

export const ProfileForm = ({ profile, setProfile, newEmployee }) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfAdmission, setDateOfAdmission] = useState(null);

  useEffect(() => {
    if(newEmployee){
      console.log("empleado nuevo");
      setIsEditing(true);
    }else{
      console.log("empleado ya creado");
    }
  },[newEmployee]);

  useEffect(() => {
    if (profile) {
      Object.keys(profile).forEach(key => {
        setValue(key, profile[key]);
      });
      setDateOfBirth(profile.date_of_birth);
      setDateOfAdmission(profile.date_of_admission);
    }
  }, [profile, setValue]);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.date_of_birth = dateOfBirth;
      data.date_of_admission = dateOfAdmission;
      if (!data.id) {
        const response = await postEmployee(data);
        setProfile(response.data); // Actualiza el estado profile con los datos del nuevo empleado
      } else {
        const response = await putEmployee(data.id, data);
        setProfile(prevProfile => ({ ...prevProfile, ...response.data }));
      }
      
      setSnackbar({ open: true, message: "Datos guardados exitosamente", severity: "success" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setSnackbar({ open: true, message: "Error al guardar los datos", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);
  
  const handleCancelClick = useCallback(() => {
    setIsEditing(false);
    if (profile) {
      Object.keys(profile).forEach(key => {
        setValue(key, profile[key]);
      });
      setDateOfBirth(profile.date_of_birth);
      setDateOfAdmission(profile.date_of_admission);
    }
  }, [profile, setValue]);
  
  return (
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 2,
        }}
        autoComplete="off"
      >
        <FormField
          label="Nombre"
          name="firstname"
          rules={{ required: "El nombre es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Apellido"
          name="lastname"
          rules={{ required: "El apellido es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="DNI"
          name="dni"
          rules={{ required: "El DNI es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Categoría"
          name="category"
          rules={{ required: "La Categoria es obligatoria" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="CUIL"
          name="cuil"
          rules={{ required: "El CUIL es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Celular"
          name="cell_phone_number"
          rules={{ required: "El celular es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Teléfono"
          name="home_phone_number"
          rules={{ required: "El teléfono es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Email"
          name="email"
          rules={{
            required: "El email es obligatorio",
            pattern: { value: /\S+@\S+\.\S+/, message: "El email no es válido" },
          }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Estado civil"
          name="marital_status"
          rules={{ required: "El estado civil es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Género"
          name="gender"
          rules={{ required: "El género es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Nacionalidad"
          name="nationality"
          rules={{ required: "La nacionalidad es obligatoria" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Horario laboral"
          name="working_hours"
          rules={{ required: "El horario laboral es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        <FormField
          label="Puesto laboral"
          name="job_position"
          rules={{ required: "El puesto laboral es obligatorio" }}
          register={register}
          errors={errors}
          readOnly={!isEditing}
        />
        {!isEditing && (
          <>
            <FormField
              label="Fecha de nacimiento"
              name="date_of_birth"
              rules={{ required: "La fecha de nacimiento es obligatoria" }}
              register={register}
              errors={errors}
              readOnly={!isEditing}
            />

            <FormField
              label="Fecha de admisión"
              name="date_of_admission"
              rules={{ required: "La fecha de admisión es obligatoria" }}
              register={register}
              errors={errors}
              readOnly={!isEditing}
            />
          </>
        )}
        {isEditing && (
          <>
          <BasicDatePicker
            label="Fecha de nacimiento"
            date={dateOfBirth}
            onChange={(newValue) => {
              setValue("date_of_birth", newValue, { shouldValidate: true });
              setDateOfBirth(newValue);
            }}
            sx={{ color: !isEditing ? 'gray' : 'inherit' }}
          />
          <BasicDatePicker
            label="Fecha de admisión"
            date={dateOfAdmission}
            onChange={(newValue) => {
              setValue("date_of_admission", newValue, { shouldValidate: true });
              setDateOfAdmission(newValue);
            }}
            sx={{ color: !isEditing ? 'gray' : 'inherit' }}
          />
        </>
        )}
      </Box>
      {/* Ventana emergente (Snackbar) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Posición en la parte inferior izquierda
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            maxWidth: "400px",
          }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
      {user && user["roles/roles"] && (user["roles/roles"].includes("admin") || user["roles/roles"].includes("gerente")) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}
        >
          {!isEditing ? (
            <Button
            startIcon={<EditNoteIcon />}
            variant="contained"
            size="large"
            onClick={handleEditClick}
            aria-label="Modificar perfil"
          >
            Modificar
          </Button>
          ) : (
            <>
              <Button
                sx={{ mr: 2, backgroundColor: '#5bbc5e' }}
                startIcon={<SaveIcon />}
                variant="contained"
                size="large"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                aria-label="Guardar cambios"
              >
                {loading ? "Guardando..." : "Guardar"}
              </Button>
              <Button
                startIcon={<CloseIcon />}
                variant="outlined"
                color="error"
                size="large"
                onClick={handleCancelClick}
                aria-label="Cancelar cambios"
              >
                Cancelar
              </Button>
            </>
          )}
        </Box>
      )}
    </>
    );
  };