import { render, screen } from '@testing-library/react';
import MyAvailableOrders from '../components/MyAvailableOrders'
import React from 'react'


describe('Test MyAvailableOrders', () => {
  test('renders the page with the list of available orders', () => {
    render(<MyAvailableOrders />);


    var element = screen.getByText("Orders ready to be picked up")
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

  });

})