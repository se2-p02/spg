import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import MyNotAvailableOrders from '../components/MyNotAvailableOrders'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


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

  it("tests go back", async () => {
    renderWithRouter(<MyNotAvailableOrders
        clock={moment('2021-11-27 7:55')}
        setClock={jest.fn()}
        user={{ id: 1, role: "wmanager", username: "admin@admin.admin" }} />, "/wmanager/notAvailableOrders");
    
    let elem = screen.getByText("Back")
    fireEvent.click(elem)
    expect(window.location.pathname).toMatch('/wmanager')


  });

})
