import { screen, fireEvent, waitFor } from "@testing-library/react";
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
    fireEvent.click(screen.getByTestId('removeBtn1'));

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
      <MyProducts modify={true} updateProducts={true} setUpdateProducts={() => jest.fn()}
        cart={[{ id: 2, name: 'Milk', quantity: 2.0, unit: 'l' }, { id: 4, name: 'Flour', quantity: 1.0, unit: 'kg' }]} setCart={() => { jest.fn() }} /></>, "/employee/products");

    await waitFor(() => {
      const pill = screen.getByTestId("pill");
      expect(pill).toBeInTheDocument();
      expect(pill.innerHTML).toBe("0")
      const button2 = screen.getByTestId('addCart2')
      expect(button2).toBeInTheDocument();
      act(() => fireEvent.click(button2))
      expect(pill).toBeInTheDocument();
      expect(pill.innerHTML).toBe("0");
      const qntBtn2 = screen.getByTestId('pQnt2');
      expect(qntBtn2).toBeInTheDocument();
      act(() => {
        fireEvent.change(qntBtn2, { target: { value: 1 } });
        expect(qntBtn2.value).toBe('1');
        fireEvent.click(button2);
      });
      expect(qntBtn2.value).toBe('0');

      const button9 = screen.getByTestId('addCart9');
      const qntBtn9 = screen.getByTestId('pQnt9');
      expect(qntBtn9).toBeInTheDocument();
      act(() => {
        fireEvent.change(qntBtn9, { target: { value: 1 } });
        expect(qntBtn9.value).toBe('1');
        fireEvent.click(button9);
      });
      expect(qntBtn9.value).toBe('0');
    });
  });

  it('test filter and search bar', async () => {
    renderWithRouter(<><MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-21 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
      cart={[]} />
      <MyProducts full={true} updateProducts={true} setUpdateProducts={() => jest.fn()}
        cart={[{ id: 2, name: 'Milk', quantity: 2.0, unit: 'l' }, { id: 4, name: 'Flour', quantity: 1.0, unit: 'kg' }]} setCart={() => { jest.fn() }} /></>, "/employee/products");

    await waitFor(() => {
      const filterBar = screen.getByTestId('filterBar');
      expect(filterBar.value).toBe('All');
      act(() => {
        fireEvent.click(filterBar);
        expect(screen.getByTestId('f2')).toBeInTheDocument();
        fireEvent.change(filterBar, { target: { value: 'Dairy and Eggs' } });
        expect(filterBar.value).toBe('Dairy and Eggs');
      });
    });

    await waitFor(() => {
      const searchBar = screen.getByTestId('searchBar');
      act(() => {
        fireEvent.change(searchBar, { target: { value: 'Findus' } });
        fireEvent.click(screen.getByTestId('sbX'));
        expect(searchBar.value).toBe('');
      });
    });
  });

})
