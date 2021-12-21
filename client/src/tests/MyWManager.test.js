import LeftWManager from '../components/LeftWManager'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test employee', () => {

  test('renders the wmanaer left page', () => {
    renderWithRouter(
      <LeftWManager fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByTestId("deliveries")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("availableOrders")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("notAvailableOrders");
    expect(element).toBeInTheDocument();

    expect(window.location.pathname === "/wmanager");


  });

  test('test wmanager buttons', () => {

    renderWithRouter(
      <LeftWManager fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByTestId("deliveries")
    fireEvent.click(element)
    expect(window.location.pathname === "/wmanager/deliveries");

    renderWithRouter(
      <LeftWManager fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("availableOrders")
    fireEvent.click(element)
    expect(window.location.pathname === "/wmanager/availableOrders");

    renderWithRouter(
      <LeftWManager fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("notAvailableOrders")
    fireEvent.click(element)
    expect(window.location.pathname === "/wmanager/notAvailableOrders");


  });
})