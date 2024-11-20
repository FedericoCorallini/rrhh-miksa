import React from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Usamos el adaptador para DateFns

export const BasicDatePicker = React.forwardRef({ label, date, onChange }, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} variant="standard" inputRef={ref} />}
      />
    </LocalizationProvider>
  );
};