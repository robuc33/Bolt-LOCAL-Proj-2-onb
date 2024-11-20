import React from 'react';
import { TextField, Box } from '@mui/material';

const JobStep = ({ formProps }) => {
  const { values, handleChange, errors, touched } = formProps;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        id="jobTitle"
        name="jobTitle"
        label="Job Title"
        value={values.jobTitle}
        onChange={handleChange}
        error={touched.jobTitle && Boolean(errors.jobTitle)}
        helperText={touched.jobTitle && errors.jobTitle}
        aria-label="Job Title"
      />
      <TextField
        fullWidth
        id="companyName"
        name="companyName"
        label="Company Name"
        value={values.companyName}
        onChange={handleChange}
        error={touched.companyName && Boolean(errors.companyName)}
        helperText={touched.companyName && errors.companyName}
        aria-label="Company Name"
      />
    </Box>
  );
};

export default JobStep;
