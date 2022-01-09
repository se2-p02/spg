import { screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MyNavBar from "../components/MyNavBar";
import MyNotAvailableOrders from '../components/MyNotAvailableOrders'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


describe('Test MyAvailableOrders', () => {
  it('renders the page with the list of not jet available orders', async () => {
    renderWithRouter(<><MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-21 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
      cart={[]} />
      <MyNotAvailableOrders user={{ id: 1, role: "employee", username: "admin@admin.admin" }} /></>, "/wworker/notAvailableOrders");

    await waitFor(() => {
      let element = screen.getByText("Order");
      expect(element).toBeInTheDocument();
      element = screen.getByText("User");
      expect(element).toBeInTheDocument();
      element = screen.getByText("Products");
      expect(element).toBeInTheDocument();
      element = screen.getByText("Date");
      expect(element).toBeInTheDocument();
      element = screen.getByText("Time");
      expect(element).toBeInTheDocument();
      element = screen.getByText("Amount");
      expect(element).toBeInTheDocument();
      element = screen.getByText("Confirm");
      expect(element).toBeInTheDocument();
      element = screen.getByTestId("container");
      expect(element).toBeInTheDocument();
    });
  });
})
