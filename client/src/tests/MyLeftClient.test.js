import LeftClient from '../components/LeftClient'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test employee', () => {

  test('renders the employee starting page', () => {
    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByTestId("profile")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("products")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("orders");
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("availableOrders");
    expect(element).toBeInTheDocument();

    expect(window.location.pathname === "/client");


  });

  test('test employee buttons', () => {

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByTestId("profile")
    fireEvent.click(element)
    expect(window.location.pathname === "/client/profile");

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("products")
    fireEvent.click(element)
    expect(window.location.pathname === "/client/products");

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("orders")
    fireEvent.click(element)
    expect(window.location.pathname === "/client/orders");

    renderWithRouter(
        <LeftClient fil={""} setFil={jest.fn()} />
      );

    element = screen.getByTestId("availableOrders")
    fireEvent.click(element)
    expect(window.location.pathname === "/client/availableOrders");


  });
})