import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import MyProducts from '../components/MyProducts'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyProducts', () => {
  test('renders the products page', () => {
    render(<MyProducts />);


    var element = screen.getByText("Back")
    expect(element).toBeInTheDocument();

    element = screen.getByPlaceholderText("Search for a product");
    expect(element).toBeInTheDocument();

  });

  it("tests go back", async () => {
    renderWithRouter(<MyProducts
        showCart={false}
        clock={moment('2021-11-27 7:55')}
        setClock={jest.fn()}
        user={{ id: 1, role: "wmanager", username: "wmanager@wmanager.wmanager" }} />, "/wmanager/deliveries");
    
    let elem = screen.getByText("Back")
    fireEvent.click(elem)
    expect(window.location.pathname).toMatch('/wmanager')


  });

})
