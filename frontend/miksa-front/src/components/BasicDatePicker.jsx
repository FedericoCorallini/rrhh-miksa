import React from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Usamos el adaptador para DateFns

export const BasicDatePicker = React.forwardRef(({ label, date, onChange }, ref) => {
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
});




// import * as React from 'react';
// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export const BasicDatePicker = ({label, date, name, onChange}) => {
// return (
//   <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker label={label} value={dayjs(date)} 
//       onChange={(newValue) => {
//         const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : ''
//         onChange({ target: { name, value: formattedDate } });
//       }}
//       format="DD/MM/YYYY"/>
//   </LocalizationProvider>
// );
// }