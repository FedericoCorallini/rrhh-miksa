import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from "@auth0/auth0-react";

export const AccountFields = ({ profile }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: profile,
  });

  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [isEditing, setIsEditing] = useState(false);

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
      // Aquí deberías llamar a la función para guardar los datos
      console.log(data);
      setSnackbar({ open: true, message: "Datos guardados exitosamente", severity: "success" });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Error al guardar los datos", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (profile) {
      for (const key in profile) {
        setValue(key, profile[key]);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 2,
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <TextField
          label="CBU"
          variant="standard"
          {...register("cbu", { required: "El CBU es obligatorio" })}
          error={!!errors.cbu}
          helperText={errors.cbu?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        />

        <TextField
          label="Alias"
          variant="standard"
          {...register("alias", { required: "El alias es obligatorio" })}
          error={!!errors.alias}
          helperText={errors.alias?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        />

        <TextField
          label="Banco"
          select
          variant="standard"
          {...register("bank", { required: "El banco es obligatorio" })}
          error={!!errors.bank}
          helperText={errors.bank?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        >
          <MenuItem value="Galicia">Galicia</MenuItem>
          <MenuItem value="BBVA">BBVA</MenuItem>
          <MenuItem value="Provincia">Provincia</MenuItem>
        </TextField>

        <TextField
          label="Sucursal"
          select
          variant="standard"
          {...register("branch", { required: "La sucursal es obligatoria" })}
          error={!!errors.branch}
          helperText={errors.branch?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        >
          <MenuItem value="Sucursal1">Sucursal 1</MenuItem>
          <MenuItem value="Sucursal2">Sucursal 2</MenuItem>
          <MenuItem value="Sucursal3">Sucursal 3</MenuItem>
        </TextField>

        <TextField
          label="Número de cuenta"
          variant="standard"
          {...register("accountNumber", { required: "El número de cuenta es obligatorio" })}
          error={!!errors.accountNumber}
          helperText={errors.accountNumber?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        />

        <FormControlLabel
          control={<Checkbox {...register("isSalaryAccount")} />}
          label="Cuenta a sueldo"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: '#666666',
            },
          }}
        />
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
            >
              Modificar
            </Button>
          ) : (
            <>
              <Button
                sx={{ mr: 2, backgroundColor: '#5bbc5e' }}
                type="submit"
                startIcon={<SaveIcon />}
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </Button>
              <Button
                startIcon={<CloseIcon />}
                variant="outlined"
                color="error"
                size="large"
                onClick={handleCancelClick}
              >
                Cancelar
              </Button>
            </>
          )}
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
  );
};