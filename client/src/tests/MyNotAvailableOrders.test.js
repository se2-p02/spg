import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import MyNotAvailableOrders from '../components/MyNotAvailableOrders'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyAvailableOrders', () => {
  test('renders the page with the list of not jet available orders', () => {
    render(<MyNotAvailableOrders />);

    var element = screen.getByText("Order");
    expect(element).toBeInTheDocument();
    element = screen.getByText("User");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Products");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Date");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Time");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Amount");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Confirm");
    expect(element).toBeInTheDocument();


  });


})
