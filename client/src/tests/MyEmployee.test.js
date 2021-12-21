import LeftEmployee from '../components/LeftEmployee'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test employee', () => {

  test('renders the employee starting page', () => {
    renderWithRouter(
      <LeftEmployee fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByTestId("clients")

    expect(element).toBeInTheDocument();

    element = screen.getByTestId("products")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("orders");

    expect(element).toBeInTheDocument();

    expect(window.location.pathname === "/employee");


  });

  test('test employee buttons', () => {

    renderWithRouter(
      <LeftEmployee fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByTestId("clients")
    fireEvent.click(element)
    expect(window.location.pathname === "/employee/clients");

    renderWithRouter(
      <LeftEmployee fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("products")
    fireEvent.click(element)
    expect(window.location.pathname === "/employee/products");

    renderWithRouter(
      <LeftEmployee fil={""} setFil={jest.fn()} />
    );

    element = screen.getByTestId("orders")
    fireEvent.click(element)
    expect(window.location.pathname === "/employee/orders");





  });
})