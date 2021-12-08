import MyEmployee from '../components/MyEmployee'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

const moment = require('moment');

import { createMemoryHistory } from 'history';

describe('Test employee', () => {

  test('renders the employee starting page', () => {
    render(<MyEmployee />);
    var element = screen.getByText("Clients")

    expect(element).toBeInTheDocument();

    var element = screen.getByText("Products")
    expect(element).toBeInTheDocument();

    element = screen.getByText("Orders");

    expect(element).toBeInTheDocument();


  });

  test('test employee e2e', () => {
    
    


    let user = {
      id: 1,
      name: "nino",
      surname: "frassica",
      wallet: 1300
    }
    

    let date = moment("2021-11-28 15:55");
    

    render(
      <BrowserRouter>
        <MyEmployee user={user} setClock={() => jest.fn()} clock={date} />
      </BrowserRouter>
    );
    


    //TODO click on Clients
    expect(window.location.pathname==="/employee");
    



  });
})