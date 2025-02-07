import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export const PermissionDetailsModal = ({ permission, onClose }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ color: 'darkslategray' }}>
        Detalles de la Solicitud
      </Typography>
      <TextField
        label="Empleado"
        value={permission.employee_name}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true, style: { color: 'gray' } }}
      />
      <TextField
        label="Motivo"
        value={permission.reason}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true, style: { color: 'gray' } }}
      />
      <TextField
        label="Fecha de inicio"
        value={permission.start_date}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true, style: { color: 'gray' } }}
      />
      <TextField
        label="Fecha de finalización"
        value={permission.end_date}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true, style: { color: 'gray' } }}
      />
      <TextField
        label="Estado"
        value={permission.permission_state}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true, style: { color: 'gray' } }}
      />
      <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
        Cerrar
      </Button>
    </Box>
  );
};
