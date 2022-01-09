import { screen, fireEvent, wait, waitFor } from "@testing-library/react";
import MyProducts from '../components/MyProducts'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'
import MyNavBar from "../components/MyNavBar";
import { act } from "react-dom/test-utils";


describe('Test MyProducts', () => {
  it('renders the products page', async () => {
    renderWithRouter(<><MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-21 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
      cart={[{ id: 1, name: 'Milk', quantity: 2.0, unit: 'l' }]} />
      <MyProducts /></>, "/employee/products");

    expect(screen.getByTestId('productCards')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cartIcon'));
    fireEvent.click(screen.getByTestId('removeBtn'));

    var element = screen.getByPlaceholderText("Search for a product");
    expect(element).toBeInTheDocument();

  });

  it('renders the products', async () => {
    renderWithRouter(<><MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-21 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
      cart={[{ id: 1, name: 'Milk', quantity: 2.0, unit: 'l' }]} />
      <MyProducts cart={[]} setCart={() => { jest.fn() }} /></>, "/employee/products");

    await waitFor(() => {
      expect(screen.getByText('Milk')).toBeInTheDocument();
      expect(screen.getByText('Findus')).toBeInTheDocument();
      expect(screen.getByTestId('addCart2')).toBeInTheDocument();
      expect(screen.getByTestId('addCart9')).toBeInTheDocument();
    })


  });

  it('test cart', async () => {
    renderWithRouter(<><MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-21 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
      cart={[]} />
      <MyProducts cart={[]} setCart={() => { jest.fn() }} /></>, "/employee/products");
    let pill = screen.getByTestId("pill")

    await waitFor(() => {
      expect(pill).toBeInTheDocument();
      expect(pill.innerHTML).toBe("0")
      let button = screen.getByTestId('addCart2')
      expect(button).toBeInTheDocument();
      act(() => {
        fireEvent.click(button)
      })
      expect(pill).toBeInTheDocument();
      expect(pill.innerHTML).toBe("0")


    })
    



  });



})
