import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const BasicDatePicker = ({ label, date, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={date ? dayjs(date) : null}
        onChange={(newValue) => {
          const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
          onChange(formattedDate);
        }}
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
};