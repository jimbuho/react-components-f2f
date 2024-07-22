import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FieldDate = ({ label, name, value = new Date(), onChange, error, ...props }) => {
  const dayjsValue = dayjs(value);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        name={name}
        value={dayjsValue}
        onChange={(event) => onChange(event, name)}
        slotProps={{ textField: { error:error?.isError, helperText:error?.message } }}
        {...props}
      />
    </LocalizationProvider>
  );
};


export default FieldDate;