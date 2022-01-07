import LeftManager from '../components/LeftManager'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test manager', () => {

  test('renders the manager left page', () => {
    renderWithRouter(
      <LeftManager fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByText("Unretrieved orders")
    expect(element).toBeInTheDocument();

  });

  test('test left manager buttons', () => {

    renderWithRouter(
      <LeftManager fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByText("Unretrieved orders")
    fireEvent.click(element)
    expect(window.location.pathname === "/manager/unretrievedOrders");
   


  });
})