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
import { getEmployee, putEmployee } from "../../utils/Axios";

export const AccountFields = ({ employeeId }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      bank_account: {
        cbu: "",
        alias: "",
        account_number: "",
        bank: "",
        bank_branch: "",
        isSalaryAccount: false
      }
    },
  });

  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  console.log("empleado: ", employeeId);
  useEffect(() => {
    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  const fetchEmployeeData = async () => {
    try {
      const response = await getEmployee(employeeId);
      const bankAccount = response.data.bank_account;
      for (const key in bankAccount) {
        setValue(`bank_account.${key}`, bankAccount[key]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const onSubmit = async (data) => {
    if (!data.bank_account.cbu || !data.bank_account.alias || !data.bank_account.account_number) {
      setSnackbar({ open: true, message: "Faltan completar datos obligatorios" });
      setIsSuccess(false);
      return;
    }
    const employeeData = {
      bank_account: data.bank_account 
    };
    setLoading(true);
    try {
      await putEmployee(employeeId, employeeData);
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
    fetchEmployeeData();
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
          />

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