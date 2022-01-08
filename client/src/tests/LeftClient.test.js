import LeftClient from '../components/LeftClient'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'
import { useState } from "react";
const moment = require('moment');



let clock = moment("2021-11-28 15:55");
let user = {
  id: 1,
  name: "nino",
  surname: "frassica",
  wallet: 1300
}

describe('Test employee', () => {

  test('renders the employee starting page', () => {

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} clock={clock} setClock={jest.fn()} user={user} showModal={false} setShowModal={jest.fn()} />
    );
    var element = screen.getByTestId("profile")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("products")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("orders");
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("availableOrders");
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("teleg");
    expect(element).toBeInTheDocument();

    expect(window.location.pathname === "/client");


  });

  test('test employee buttons', () => {

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} clock={clock} setClock={jest.fn()} user={user} showModal={false} setShowModal={jest.fn()} />
    );

    var element = screen.getByTestId("profile")
    fireEvent.click(element)
    expect(window.location.pathname).toEqual('/client/profile');

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} clock={clock} setClock={jest.fn()} user={user} showModal={false} setShowModal={jest.fn()} />
    );

    element = screen.getByTestId("products")
    fireEvent.click(element)
    expect(window.location.pathname).toEqual("/client/products");

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} clock={clock} setClock={jest.fn()} user={user} showModal={false} setShowModal={jest.fn()} />
    );

    element = screen.getByTestId("orders")
    fireEvent.click(element)
    expect(window.location.pathname).toEqual("/client/orders");

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} clock={clock} setClock={jest.fn()} user={user} showModal={false} setShowModal={jest.fn()} />
    );

    element = screen.getByTestId("availableOrders")
    fireEvent.click(element)
    expect(window.location.pathname).toEqual("/client/availableOrders");

    renderWithRouter(
      <LeftClient fil={""} setFil={jest.fn()} clock={clock} setClock={jest.fn()} user={user} showModal={false} setShowModal={jest.fn()} />
    );
    element = screen.getByTestId("teleg")
    fireEvent.click(element)
    //console.log(window.location.pathname)
    expect(window.location.pathname).toEqual("/");

  });
})