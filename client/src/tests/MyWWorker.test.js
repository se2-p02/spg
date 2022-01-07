import LeftWWorker from '../components/LeftWWorker'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test wworker', () => {

  test('renders the wworker left page', () => {
    renderWithRouter(
      <LeftWWorker fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByText("Available Orders")
    expect(element).toBeInTheDocument();

  });

  test('test left manager buttons', () => {

    renderWithRouter(
      <LeftWWorker fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByText("Available Orders")
    fireEvent.click(element)
    expect(window.location.pathname === "/wmanager/availableOrders");
   


  });
})