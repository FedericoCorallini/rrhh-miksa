import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BasicDatePicker } from "../BasicDatePicker";
import { Button } from "@mui/material";
import { postEmployee, putEmployee } from "../../utils/Axios";
import { useAuth0 } from "@auth0/auth0-react";

// Componente reutilizable para TextField
const FormField = ({ label, name, rules, register, errors, select, children, ...props }) => (
  <TextField
    label={label}
    {...register(name, rules)}
    error={!!errors[name]}
    helperText={errors[name]?.message}
    select={select}
    variant="standard"
    fullWidth
    {...props}
  >
    {children}
  </TextField>
);

export const ProfileForm = ({ profile }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: profile,
  });

  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    if (profile) {
      for (const key in profile) {
        setValue(key, profile[key]);
      }
    }
  }, [profile, setValue]);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.id === undefined) {
        await postEmployee(data);
      } else {
        await putEmployee(data.id, data);
      }
      setSnackbar({ open: true, message: "Datos guardados exitosamente", severity: "success" });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Error al guardar los datos", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        />
        <FormField
          label="Apellido"
          name="lastname"
          rules={{ required: "El apellido es obligatorio" }}
          register={register}
          errors={errors}
        />
        <FormField
          label="DNI"
          name="dni"
          rules={{ required: "El DNI es obligatorio" }}
          register={register}
          errors={errors}
        />
        <FormField
          label="CUIL"
          name="cuil"
          rules={{ required: "El CUIL es obligatorio" }}
          register={register}
          errors={errors}
        />
        <FormField
          label="Celular"
          name="cell_phone_number"
          rules={{ required: "El celular es obligatorio" }}
          register={register}
          errors={errors}
        />
        <FormField
          label="Teléfono"
          name="home_phone_number"
          rules={{ required: "El teléfono es obligatorio" }}
          register={register}
          errors={errors}
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
        />
        <FormField
          label="Estado civil"
          name="marital_status"
          rules={{ required: "El estado civil es obligatorio" }}
          register={register}
          errors={errors}
          select
        >
          <MenuItem value="soltero">Soltero</MenuItem>
          <MenuItem value="casado">Casado</MenuItem>
          <MenuItem value="divorciado">Divorciado</MenuItem>
          <MenuItem value="viudo">Viudo</MenuItem>
        </FormField>
        <FormField
          label="Género"
          name="gender"
          rules={{ required: "El género es obligatorio" }}
          register={register}
          errors={errors}
          select
        >
          <MenuItem value="hombre">Hombre</MenuItem>
          <MenuItem value="mujer">Mujer</MenuItem>
          <MenuItem value="otro">Otro</MenuItem>
        </FormField>
        <FormField
          label="Nacionalidad"
          name="nationality"
          rules={{ required: "La nacionalidad es obligatoria" }}
          register={register}
          errors={errors}
          select
        >
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Brasil">Brasil</MenuItem>
          <MenuItem value="Chile">Chile</MenuItem>
        </FormField>
        <FormField
          label="Horario laboral"
          name="working_hours"
          rules={{ required: "El horario laboral es obligatorio" }}
          register={register}
          errors={errors}
        />
        <FormField
          label="Puesto laboral"
          name="job_position"
          rules={{ required: "El puesto laboral es obligatorio" }}
          register={register}
          errors={errors}
        />
        <BasicDatePicker
          label="Fecha de nacimiento"
          value={watch("date_of_birth")}
          onChange={(newValue) => setValue("date_of_birth", newValue, { shouldValidate: true })}
        />
        <BasicDatePicker
          label="Fecha de admisión"
          value={watch("date_of_admission")}
          onChange={(newValue) => setValue("date_of_admission", newValue, { shouldValidate: true })}
        />
      </Box>
      {user && user["roles/roles"] && user["roles/roles"].includes("admin") && (
        <Button
          sx={{ mt: "15px" }}
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      )}

      {/* Ventana emergente (Snackbar) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posición en la parte superior central
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            maxWidth: "400px", // Opcional: limitar el ancho del mensaje
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};
