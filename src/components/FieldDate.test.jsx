import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FieldDate from './FieldDate';
import '@testing-library/jest-dom';

describe('FieldDate', () => {
  it('renders a DatePicker component', () => {
    render(<FieldDate label="Fecha" name="myDate" />);
    const datePicker = screen.getByLabelText('Fecha');
    expect(datePicker).toBeInTheDocument();
  });

  it('handles onChange event', async() => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(<FieldDate label="Fecha" name="myDate" onChange={handleChange} />);
  
    const datePicker = getByLabelText('Fecha');
    await userEvent.click(datePicker); // Simula un click en el DatePicker

    const button = screen.getByRole('button'); 
    await userEvent.click(button);

    const today = new Date();

    const selectADateButton = screen.getByRole('gridcell', { name: `${today.getDate()}` })
    await userEvent.click(selectADateButton);

    const inputDate = screen.getByRole('textbox', {name:'Fecha'});

    const month = (today.getMonth()+1).toString().padStart(2, '0');
    const day = (today.getDate()).toString().padStart(2, '0');
    const dateMatch = `${month}/${day}/${today.getFullYear()}`;
    
    expect(dateMatch).toEqual(inputDate.value);
  });

  // Agrega más casos de prueba según sea necesario
});