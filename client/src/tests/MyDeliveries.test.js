import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyDeliveries from '../components/MyDeliveries'
import React from 'react'
import { act } from "react-dom/test-utils"
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyDeliveries', () => {
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
    
    await waitFor(() => {expect(getByText(1)).toBeInTheDocument()})
    

    act(() => {
      fireEvent.click(elem)
    });
    elem = screen.getByTestId("modal");
    expect(elem).toBeInTheDocument();
    //elem = screen.getByText("TerraGrossa");
    //expect(elem).toBeInTheDocument();
  });

})
