import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const FieldSelect = ({ options, label, name, value, onChange, error, fullWidth, ...props}) => {
  const labelId = name + '-label';
  return (
    <FormControl fullWidth={fullWidth} variant="outlined" margin="normal" sx={{ minWidth: 140 }}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select 
            labelId={labelId}
            name={name}
            value={value || ''}
            onChange={onChange}
            error={error?.isError}
            {...props}>
            {options.map((option) => (
            <MenuItem key={option.id} value={option.key}>
                {option.title}
            </MenuItem>
            ))}
        </Select>
    </FormControl>
  );
};

export default FieldSelect;