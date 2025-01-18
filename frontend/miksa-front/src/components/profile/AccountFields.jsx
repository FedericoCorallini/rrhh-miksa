import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export const AccountFields = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "space-between",
        alignItems: "left",
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
        sx={{ width: "20%" }}
      />

      <TextField
        label="Alias"
        variant="standard"
        {...register("alias", { required: "El alias es obligatorio" })}
        error={!!errors.alias}
        helperText={errors.alias?.message}
        sx={{ width: "20%" }}
      />

      <TextField
        label="Banco"
        select
        variant="standard"
        {...register("bank", { required: "El banco es obligatorio" })}
        error={!!errors.bank}
        helperText={errors.bank?.message}
        sx={{ width: "20%" }}
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
        sx={{ width: "20%" }}
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
        sx={{ width: "20%" }}
      />

      <FormControlLabel
        control={<Checkbox {...register("isSalaryAccount")} />}
        label="Cuenta Salario"
        sx={{ width: "20%" }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: "15%",
          marginTop: 2,
        }}
      >
        Guardar
      </Button>
    </Box>
  );
};