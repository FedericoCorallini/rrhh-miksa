import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const FamilyFields = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Padre" variant="standard" />
      <TextField id="standard-basic" label="Madre" variant="standard" />
      <TextField id="standard-basic" label="Hijo" variant="standard" />


    </Box>
  );
}