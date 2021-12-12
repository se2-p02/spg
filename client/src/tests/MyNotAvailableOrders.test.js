import { render, screen } from '@testing-library/react';
import MyNotAvailableOrders from '../components/MyNotAvailableOrders'
import React from 'react'


describe('Test MyAvailableOrders', () => {
  test('renders the page with the list of not jet available orders', () => {
    render(<MyNotAvailableOrders />);


    var element = screen.getByText("Confirm the orders that are ready to be picked up")
    expect(element).toBeInTheDocument();

    element = screen.getByText("Order ID");
    expect(element).toBeInTheDocument();
    element = screen.getByText("User ID");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Products");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Date");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Time");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Amount");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Confirm availablility");
    expect(element).toBeInTheDocument();
    
    element = screen.getByText("Back");
    expect(element).toBeInTheDocument();

  });

})