import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import MyAvailableOrders from '../components/MyAvailableOrders'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyAvailableOrders', () => {
  test('renders the page with the list of available orders', () => {
    render(<MyAvailableOrders/>);

    var element = screen.getByText("Order ID");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Products");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Amount");
    expect(element).toBeInTheDocument();



})



it("tests go back", async () => {
  renderWithRouter(<MyAvailableOrders
    clock={moment('2021-11-27 9:55')}
    setClock={jest.fn()}
    user={{ id: 2, role: "client", username: "client@client.client" }}
    role = "client"/>, "/client/availableOrders");
  });
   
   

});