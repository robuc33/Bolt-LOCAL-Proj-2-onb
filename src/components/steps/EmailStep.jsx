import React from 'react';
import { TextField, Box } from '@mui/material';

const EmailStep = ({ formProps }) => {
  const { values, handleChange, errors, touched } = formProps;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        aria-label="Email Address"
      />
    </Box>
  );
};

export default EmailStep;
