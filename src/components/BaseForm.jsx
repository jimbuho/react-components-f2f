import React, { useState } from 'react';

import { 
    Box, 
    Paper,
    Alert,
    Toolbar,
    Snackbar,
    Typography,
    Stack,
    Button } from '@mui/material';

import { validateFromRules } from '../utils/validator'
import FieldEdit from './FieldEdit';
import FieldSelect from './FieldSelect';
import FieldDate from './FieldDate';

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
  otherActionText=''}) => {
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

  const handleCloseAlert = () => {
    setOpenAlert(false);
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
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
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
          height: '100vh', // Altura completa de la ventana
          width: '100vw',  // Ancho completo de la ventana
          backgroundColor: '#f0f0f0', // Color de fondo para visibilidad
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Paper
          sx={{
            width: '300px',
            padding: '16px',
            textAlign: 'center',
            boxShadow: 3,
          }}>
        
          <Toolbar>
              <Typography
                  sx={{ flex: '1 1 100%' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
              >
              <h2>{title}</h2>
              </Typography>
              {otherActionText !== '' && (
              <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={onOtherAction}>{otherActionText}</Button>
              </Stack>
              )}
          </Toolbar>

          {fields.map((field) => {
              const { name, label, value, type, options, error, ...fieldProps } = field;
              const fieldValue = formState[name] || value;
              const fieldError = errors[name] || null;

              if(type === 'select') {
                return (
                  <FieldSelect key={field.id} options={options} label={label} name={name} value={fieldValue} onChange={handleInputChange} error={fieldError} />
                );
              }
              else if(type === 'date') {
                return (
                  <FieldDate key={field.id} label={label} name={name} value={fieldValue} onChange={handleInputChange} error={fieldError}/>
                );
              }
              else {
                return (
                  <FieldEdit key={field.id} label={label} name={name} value={fieldValue} onChange={handleInputChange} error={fieldError} {...fieldProps}/>
                );
              }
          })}
          
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