import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const AccountFields = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="CBU" variant="standard" />
      <TextField id="standard-basic" label="Alias" variant="standard" />
      <TextField id="standard-basic" label="Banco" variant="standard" />
      <TextField id="standard-basic" label="Tipo de cuenta" variant="standard" />
    </Box>
  );
}