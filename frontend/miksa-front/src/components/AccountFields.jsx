import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import { postEmployee, putEmployee } from "../utils/Axios";
import { useAuth0 } from "@auth0/auth0-react";

export const AccountFields = ({ profile }) => {
  const [data, setData] = useState({
    ...profile,
    bank_account: profile.bank_account || {} // Asegura que bank_account esté siempre definido
  });
  const { user } = useAuth0();
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setData({
      ...profile,
      bank_account: profile.bank_account || {}, // Asegura que bank_account esté siempre definido
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      bank_account: {
        ...prevData.bank_account,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!data.bank_account.cbu) newErrors.cbu = "El CBU es obligatorio";
    if (!data.bank_account.alias) newErrors.alias = "El alias es obligatorio";
    if (!data.bank_account.account_number) newErrors.account_number = "El número de cuenta es obligatorio";
    if (!data.bank_account.bank_branch) newErrors.bank_branch = "La sucursal bancaria es obligatoria";
    if (!data.bank_account.bank) newErrors.bank = "Seleccione un banco";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitAction = data.id === undefined ? postEmployee(data) : putEmployee(data.id, data);

    submitAction
      .then(() => {
        setIsSuccess(true);
        setOpenSnackbar(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setOpenSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3, maxWidth: "900px", margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Información Bancaria
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        <TextField
          label="CBU"
          variant="standard"
          name="cbu"
          value={data.bank_account.cbu || ""}
          onChange={handleChange}
          error={!!errors.cbu}
          helperText={errors.cbu}
        />
        <TextField
          label="Alias"
          variant="standard"
          name="alias"
          value={data.bank_account.alias || ""}
          onChange={handleChange}
          error={!!errors.alias}
          helperText={errors.alias}
        />
        <TextField
          label="Número de cuenta"
          variant="standard"
          name="account_number"
          value={data.bank_account.account_number || ""}
          onChange={handleChange}
          error={!!errors.account_number}
          helperText={errors.account_number}
        />
        <TextField
          label="Sucursal bancaria"
          variant="standard"
          name="bank_branch"
          value={data.bank_account.bank_branch || ""}
          onChange={handleChange}
          error={!!errors.bank_branch}
          helperText={errors.bank_branch}
        />
        <TextField
          select
          label="Banco"
          variant="standard"
          name="bank"
          value={data.bank_account.bank || ""}
          onChange={handleChange}
          error={!!errors.bank}
          helperText={errors.bank}
        >
          <MenuItem value="GALICIA">Galicia</MenuItem>
          <MenuItem value="BBVA">BBVA</MenuItem>
          <MenuItem value="PROVINCIA">Provincia</MenuItem>
        </TextField>
        <TextField
          select
          label="Cuenta sueldo"
          variant="standard"
          name="salary_account"
          value={data.bank_account.salary_account ? "Sí" : "No"}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              bank_account: {
                ...prevData.bank_account,
                salary_account: e.target.value === "Sí",
              },
            }))
          }
        >
          <MenuItem value="Sí">Sí</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>

        <Box sx={{ gridColumn: "span 3", display: "flex", justifyContent: "center", mt: 2 }}>
          {user && user["roles/roles"] && user["roles/roles"].includes("admin") && (
            <Button type="submit" variant="contained" size="large">
              Guardar
            </Button>
          )}
        </Box>
      </Box>

      {/* Snackbar de éxito o error */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={isSuccess ? "success" : "error"} sx={{ width: "100%" }}>
          {isSuccess ? "Los datos se guardaron correctamente." : "Hubo un error al guardar los datos."}
        </Alert>
      </Snackbar>
    </Box>
  );
};
