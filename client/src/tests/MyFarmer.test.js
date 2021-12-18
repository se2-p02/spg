import { render, screen, fireEvent } from '@testing-library/react';
import MyFarmer from '../components/MyFarmer'
import React from 'react'
import renderWithRouter from './setupTestsRouter'
const moment = require('moment');


describe('Test navbar', () => {
  test('renders the farmer starting page', () => {
    render(<MyFarmer />);


    var element = screen.getByText("My orders")
    expect(element).toBeInTheDocument();

    element = screen.getByText("My products");
    expect(element).toBeInTheDocument();

  });

  test('e2e test buttons', () => {
    let user = {
      id: 7,
      name: "farmer",
      surname: "farmer",
      wallet: 0
    }
    
    let date = moment("2021-11-26 06:55");
    renderWithRouter(<MyFarmer setClock={()=>{jest.fn()}} clock={date} user={user} />, '/farmer' )

    let element = screen.getByText("My products");
    fireEvent.click(element);
    expect(window.location.pathname).toMatch('/farmer/myProducts')

    renderWithRouter(<MyFarmer setClock={()=>{jest.fn()}} clock={date} user={user} />, '/farmer' )

    element = screen.getByText("My orders");
    fireEvent.click(element);
    expect(window.location.pathname).toMatch('/farmer/orders')








  });
})