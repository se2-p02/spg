import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import MyDeliveries from '../components/MyDeliveries'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyAvailableOrders', () => {
  test('renders the deliveries page', () => {
    render(<MyDeliveries />);


    var element = screen.getByText("Back")
    expect(element).toBeInTheDocument();

    element = screen.getByText("Delivery id");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Product id");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Product name");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Farmer id");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Farmer name");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Quantity");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Order id");
    expect(element).toBeInTheDocument();

  });

  it("tests go back", async () => {
    renderWithRouter(<MyDeliveries
        showCart={false}
        clock={moment('2021-11-27 7:55')}
        setClock={jest.fn()}
        user={{ id: 1, role: "wmanager", username: "wmanager@wmanager.wmanager" }} />, "/wmanager/deliveries");
    
    let elem = screen.getByText("Back")
    fireEvent.click(elem)
    expect(window.location.pathname).toMatch('/wmanager')


  });

})
