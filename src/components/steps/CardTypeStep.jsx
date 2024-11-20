import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const CardTypeStep = ({ formProps }) => {
  const { values, handleChange, errors, touched } = formProps;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth error={touched.cardType && Boolean(errors.cardType)}>
        <InputLabel id="cardType-label">Card Type</InputLabel>
        <Select
          labelId="cardType-label"
          id="cardType"
          name="cardType"
          value={values.cardType}
          onChange={handleChange}
          label="Card Type"
          aria-label="Card Type"
        >
          <MenuItem value="team">Team Card</MenuItem>
          <MenuItem value="individual">Individual Card</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CardTypeStep;
