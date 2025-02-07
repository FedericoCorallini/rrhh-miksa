import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";

export const PermissionDetailsModal = ({ permission, onClose }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ color: 'darkslategray' }}>
        Detalles de la Solicitud
      </Typography>
      <Grid container columnSpacing={2} rowSpacing={0}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Empleado"
            value={permission.employee_name}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Puesto laboral"
            value={permission.employee_position}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Motivo"
            value={permission.reason}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Detalles"
            value={permission.details}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de inicio"
            value={permission.start_date}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de finalización"
            value={permission.end_date}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hora de inicio"
            value={permission.start_time}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hora de finalización"
            value={permission.end_time}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Estado"
            value={permission.permission_state}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true, style: { color: 'gray' } }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
        Cerrar
      </Button>
    </Box>
  );
};