import React from 'react';
import { render, fireEvent, act, screen, waitFor } from '@testing-library/react';
import TableReservation from '../ReservationForm/ReservationForm';
import { BrowserRouter } from 'react-router-dom';

describe('ReservationForm component', () => {
  it('submits the form with valid data', async () => {
    render(
      <BrowserRouter>
        <TableReservation />
      </BrowserRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Phone No.'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Number of people'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Arrival time'), { target: { value: '18:30' } });

    // Mocking Flatpickr date selection
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = `${tomorrow.getDate()}-${tomorrow.getMonth() + 1}-${tomorrow.getFullYear()}`;

    await act(async () => {
      fireEvent.change(screen.getByTestId('date-picker'), { target: { value: formattedDate } });
      fireEvent.submit(screen.getByTestId('submit-button'));
    });

    expect(screen.getByText('Thank you!')).toBeInTheDocument();
    expect(screen.getByText('Reservation name')).toBeInTheDocument();
    expect(screen.getByText('Table for')).toBeInTheDocument();
    expect(screen.getByText('Contact number')).toBeInTheDocument();
  });
});
