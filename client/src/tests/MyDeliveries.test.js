import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyDeliveries from '../components/MyDeliveries'
import React from 'react'
import { act } from "react-dom/test-utils"
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyDeliveries', () => {
  test('renders the deliveries page', () => {
    render(<MyDeliveries />);

    var element = screen.getByText("Delivery ID");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Product");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Farmer");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Quantity");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Order ID");
    expect(element).toBeInTheDocument();


  });

  test('renders the deliveries page with id', () => {
    render(<MyDeliveries id = "1"/>);
  });

  it("tests go back", async () => {
    act(() => {
        renderWithRouter(<MyDeliveries
      showCart={false}
      clock={moment('2021-11-23 7:55')}
      setClock={jest.fn()}
      user={{ id: 1, role: "wmanager", username: "wmanager@wmanager.wmanager" }} />, "/wmanager/deliveries");
    });
    let elem = screen.getByTestId("apbw");
    expect(elem).toBeInTheDocument();
    
    await waitFor(() => {expect(screen.getByText(1)).toBeInTheDocument()})
    

    act(() => {
      fireEvent.click(elem)
    });
    elem = screen.getByTestId("modal");
    expect(elem).toBeInTheDocument();
    await waitFor(() => {expect(screen.getByText("TerraGrossa")).toBeInTheDocument()})
  });

})
