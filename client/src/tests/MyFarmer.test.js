import LeftFarmer from '../components/LeftFarmer'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test employee', () => {

  test('renders the employee starting page', () => {
    renderWithRouter(
      <LeftFarmer fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByTestId("orders")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("myProducts")
    expect(element).toBeInTheDocument();

    expect(window.location.pathname === "/farmer");


  });

  test('test employee buttons', () => {

    renderWithRouter(
      <LeftFarmer fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByTestId("orders")
    fireEvent.click(element)
    expect(window.location.pathname === "/farmer/orders");

    renderWithRouter(
      <LeftFarmer fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("myProducts")
    fireEvent.click(element)
    expect(window.location.pathname === "/farmer/myProducts");
   

  });
})