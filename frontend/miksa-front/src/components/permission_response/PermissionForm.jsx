import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { BasicDatePicker } from "../BasicDatePicker";
import BasicTimePicker from "../BasicTimePicker";

export const PermissionForm = ({ permission }) => {
  const [data, setData] = useState(permission);

  useEffect(() => {
    setData(permission);
  }, [permission]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Empleado"
        variant="standard"
        name="employee"
        value={data.permission.employee_name || ""}
      />
      <TextField
        label="Puesto laboral"
        variant="standard"
        name="position"
        value={data.permission.employee_position || ""}
      />
      <TextField
        label="Motivo"
        variant="standard"
        name="reason"
        value={data.permission.reason || ""}
      />
      <TextField
        label="Detalles"
        variant="standard"
        name="details"
        value={data.permission.details || ""}
      />
      <BasicDatePicker
        label="Fecha de inicio"
        date={data.permission.start_date}
      />
      <BasicDatePicker
        label="Fecha de finalizacion"
        date={data.permission.end_date}
      />
      <BasicTimePicker
        label="Hora de inicio"
        time={data.permission.start_time}
      />
      <BasicTimePicker
        label="Hora de finalizacion"
        time={data.permission.end_time}
      />
    </Box>
  );
};
