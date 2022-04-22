
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentList from '../../../pages/Appointments';

describe('AppointmentList Page', () => {
  it('must render', () => {
    const { asFragment } = render(<AppointmentList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Must contains a filter button', () => {
    render(<AppointmentList />);
    const filterButton = screen.getByRole('button', {
      name: 'Filtrar',
    });
    expect(filterButton).toBeInTheDocument();
  });

  it('Must contains a remove filter button', () => {
    render(<AppointmentList />);
    const removeFilterButton = screen.getByRole('button', {
      name: 'Remover Filtro',
    });
    expect(removeFilterButton).toBeInTheDocument();
  });
});
