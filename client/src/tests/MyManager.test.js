import LeftManager from '../components/LeftManager'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test manager', () => {

  test('renders the manager left page', () => {
    renderWithRouter(
      <LeftManager fil={""} setFil={jest.fn()} />
    );
    var element = screen.getByText("Unretrieved Orders")
    expect(element).toBeInTheDocument();

  });

  test('test left manager buttons', () => {

    renderWithRouter(
      <LeftManager fil={""} setFil={jest.fn()} />
    );

    var element = screen.getByText("Unretrieved Orders")
    fireEvent.click(element)
    expect(window.location.pathname === "/manager/unretrievedOrders");
   


  });
})