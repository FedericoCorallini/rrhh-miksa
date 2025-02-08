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
import { postEmployee, putEmployee } from "../../utils/Axios";

export const AccountFields = ({ profile, setProfile }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      bank_account: {
        cbu: profile?.bank_account?.cbu || "",
        alias: profile?.bank_account?.alias || "",
        accountNumber: profile?.bank_account?.account_number || "",
        bank: profile?.bank_account?.bank || "",
        bank_branch: profile?.bank_account?.bank_branch || "",
        isSalaryAccount: profile?.bank_account?.isSalaryAccount || false
      }
    },
  });

  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile?.bank_account) {
      for (const key in profile.bank_account) {
        setValue(`bank_account.${key}`, profile.bank_account[key]);
      }
    }
  }, [profile, setValue]);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const onSubmit = async (data) => {
    if (!data.bank_account.cbu || !data.bank_account.alias || !data.bank_account.accountNumber) {
      setSnackbar({ open: true, message: "Faltan completar datos obligatorios" });
      setIsSuccess(false);
      return;
    }
    const employeeData = {
      ...profile, 
      bank_account: data.bank_account 
    };
    setLoading(true);
    try {
      if (profile?.id) {
        await putEmployee(profile.id, employeeData);
        setProfile(prevProfile => ({ ...prevProfile, ...data }));
      } else {
        await postEmployee(employeeData);
      }
      setIsSuccess(true);
      setSnackbar({ open: true, message: "Datos guardados exitosamente" });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setSnackbar({ open: true, message: "Error al guardar los datos" });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    if (profile?.bank_account) {
      for (const key in profile.bank_account) {
        setValue(`bank_account.${key}`, profile.bank_account[key]);
      }
    }
  };

  return (
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <TextField
          label="CBU"
          variant="standard"
          {...register("bank_account.cbu", { required: "El CBU es obligatorio" })}
          error={!!errors.bank_account?.cbu}
          helperText={errors.bank_account?.cbu?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        />

        <TextField
          label="Alias"
          variant="standard"
          {...register("bank_account.alias", { required: "El alias es obligatorio" })}
          error={!!errors.bank_account?.alias}
          helperText={errors.bank_account?.alias?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        />
        <TextField
          label="Banco"
          select
          variant="standard"
          {...register("bank_account.bank", { required: "El banco es obligatorio" })}
          value={watch("bank_account.bank") || ""} // Asegura que el valor se actualice
          onChange={(e) => setValue("bank_account.bank", e.target.value)}
          error={!!errors.bank_account?.bank}
          helperText={errors.bank_account?.bank?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        >
          <MenuItem value="GALICIA">Galicia</MenuItem>
          <MenuItem value="BBVA">BBVA</MenuItem>
          <MenuItem value="PROVINCIA">Provincia</MenuItem>
        </TextField>
        <TextField
          label="Sucursal"
          variant="standard"
          {...register("bank_account.bank_branch", { required: "La sucursal es obligatoria" })}
          error={!!errors.bank_account?.bank_branch}
          helperText={errors.bank_account?.bank_branch?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        >
          {/* <MenuItem value="Sucursal1">Sucursal 1</MenuItem>
          <MenuItem value="Sucursal2">Sucursal 2</MenuItem>
          <MenuItem value="Sucursal3">Sucursal 3</MenuItem> */}
        </TextField>

        <TextField
          label="Número de cuenta"
          variant="standard"
          {...register("bank_account.account_number", { required: "El número de cuenta es obligatorio" })}
          error={!!errors.bank_account?.account_number}
          helperText={errors.bank_account?.account_number?.message}
          InputProps={{
            readOnly: !isEditing,
            style: { color: !isEditing ? 'gray' : 'inherit' }
          }}
        />

        <FormControlLabel
          control={<Checkbox {...register("bank_account.isSalaryAccount")} />}
          label="Cuenta a sueldo"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: '#666666',
            },
          }}
        />
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert severity={isSuccess ? "success" : "error"} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    {user?.["roles/roles"]?.includes("admin") && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          {!isEditing ? (
            <Button startIcon={<EditNoteIcon />} variant="contained" size="large" onClick={handleEditClick}>
              Modificar
            </Button>
          ) : (
            <>
              <Button sx={{ mr: 2, backgroundColor: '#5bbc5e' }} onClick={handleSubmit(onSubmit)} startIcon={<SaveIcon />} variant="contained" size="large" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </Button>
              <Button startIcon={<CloseIcon />} variant="outlined" color="error" size="large" onClick={handleCancelClick}>
                Cancelar
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );
};
