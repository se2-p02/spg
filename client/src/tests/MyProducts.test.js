import { screen, fireEvent } from "@testing-library/react";
import MyProducts from '../components/MyProducts'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'
import MyNavBar from "../components/MyNavBar";


describe('Test MyProducts', () => {
  it('renders the products page', async () => {
    renderWithRouter(<><MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-21 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
      cart={[{id: 1, name: 'Milk', quantity: 2.0, unit: 'l'}]} />
    <MyProducts /></>, "/employee/products");

    expect(screen.getByTestId('productCards')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cartIcon'));
    fireEvent.click(screen.getByTestId('removeBtn'));

    var element = screen.getByPlaceholderText("Search for a product");
    expect(element).toBeInTheDocument();

  });

  

})
