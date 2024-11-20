import React from 'react';
import { TextField, Box } from '@mui/material';

const PhoneStep = ({ formProps }) => {
  const { values, handleChange, errors, touched } = formProps;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        id="phone"
        name="phone"
        label="Phone Number"
        value={values.phone}
        onChange={handleChange}
        error={touched.phone && Boolean(errors.phone)}
        helperText={touched.phone && errors.phone}
        aria-label="Phone Number"
      />
    </Box>
  );
};

export default PhoneStep;
