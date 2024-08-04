import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';

const FieldDate = ({ label, name, value = new Date(), onChange, error, fullWidth, ...props }) => {
  const dayjsValue = dayjs(value);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth={fullWidth} variant="outlined" margin="normal">
        <DatePicker
          label={label}
          name={name}
          value={dayjsValue}
          onChange={(event) => onChange(event, name)}
          slotProps={{ textField: { error: error?.isError, helperText: error?.message, fullWidth: fullWidth } }}
          {...props}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

export default FieldDate;