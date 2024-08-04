import React, { useState } from 'react';
import { 
    Box, 
    Paper,
    Alert,
    Toolbar,
    Snackbar,
    Typography,
    Stack,
    Button,
    Grid
} from '@mui/material';

import { validateFromRules } from '../utils/validator'
import FieldDate from './FieldDate';
import FieldSelect from './FieldSelect';
import FieldEdit from './FieldEdit';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BaseForm = ({ 
  title, 
  fields, 
  onSubmit, 
  onCancel,
  onOtherAction={}, 
  openAlert = false,
  setOpenAlert,
  alertMessage = '',
  setAlertMessage,
  formState,
  setFormState,
  cancelText='Cancel',
  nextText='Next',
  otherActionText='',
  paperStyle={
    width: '100%',
    maxWidth: '600px',
    padding: '32px',
    boxShadow: 3,
  }
  }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (event, fieldName='') => {
    const name = event.target?.name ?? fieldName;
    const value = event.target?.value ?? new Date(event.$d).toISOString().split('T')[0];
    setFormState({ ...formState, [name]: value });
    if(value) errors[name] = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formState);
    }
    else {
      setAlertMessage('Resuelva los problemas');
      setOpenAlert(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};   
    fields.forEach((field) => {
      const { name, validationrules } = field;
      const value = formState[name] || '';
      const responseValidation = validateFromRules(value, validationrules);
      if (!responseValidation.isValid) {
        newErrors[name] = {message: responseValidation.message, isError: true};
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return (
    <div className="form-wrapper">
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
          <Alert severity="error" sx={{ fontSize: 14 }}>
          <span dangerouslySetInnerHTML={{ __html: alertMessage }} />
          </Alert>
      </Snackbar>

      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', // Altura completa de la ventana
          backgroundColor: '#f0f0f0', // Color de fondo para visibilidad
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Paper
          sx={paperStyle}>
        
          <Toolbar>
              <Typography
                  sx={{ flex: '1 1 100%' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
              >
              {title}
              </Typography>
              {otherActionText !== '' && (
              <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={onOtherAction}>{otherActionText}</Button>
              </Stack>
              )}
          </Toolbar>

          <Grid container spacing={2} marginBottom={2}>
            {fields.map((field) => {
                const { name, label, value, type, options, error, width=12, ...fieldProps } = field;
                const fieldValue = formState[name] || value;
                const fieldError = errors[name] || null;

                return (
                  <Grid item xs={width} key={field.id}>
                    {type === 'select' ? (
                      <FieldSelect options={options} label={label} name={name} value={fieldValue} onChange={handleInputChange} error={fieldError} fullWidth />
                    ) : type === 'date' ? (
                      <FieldDate label={label} name={name} value={fieldValue} onChange={handleInputChange} error={fieldError} fullWidth/>
                    ) : (
                      <FieldEdit label={label} name={name} value={fieldValue} onChange={handleInputChange} error={fieldError} fullWidth {...fieldProps}/>
                    )}
                  </Grid>
                );
            })}
          </Grid>
          
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onCancel}> <NavigateBeforeIcon/> {cancelText}</Button>
            <Button variant="contained" type="submit"> {nextText} <NavigateNextIcon/> </Button>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};

export default BaseForm;