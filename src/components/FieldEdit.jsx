import React from 'react';

import { TextField } from '@mui/material';

const FieldEdit = ({ label, name, value, onChange, error, ...props}) => {
  return (
      <TextField 
         label={label} 
         variant="outlined"
         id={name}
         name={name}
         value={value}
         onChange={onChange}
         error={error?.isError}
         helperText={error?.message}
         {...props}
      />
  );
};

export default FieldEdit;