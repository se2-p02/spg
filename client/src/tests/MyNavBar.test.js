import NavBar from '../components/MyNavBar'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

const moment = require('moment');


describe('Test navbar', () => {

    test('renders all components', () => {
        let user = {
            id: 1,
            name: "nino",
            surname: "frassica",
            wallet: 1300
        }
        let clock = moment("2021-11-28 15:55");

        render(<BrowserRouter>
            <NavBar user={user} clock={clock} setClock={() => jest.fn()} setUser={() => jest.fn()} setCart={() => jest.fn()} showCart={true} cart={[]} />
        </BrowserRouter>);
        var element = screen.getByText("Social Purchasing Group")
        expect(element).toBeInTheDocument();

        element = screen.getByTestId("clock")
        expect(element).toBeInTheDocument();

        element = screen.getByTestId("my_logout")
        expect(element).toBeInTheDocument();

    });
    test("test logout", () => {
        let user = {
            id: 1,
            name: "nino",
            surname: "frassica",
            wallet: 1300
        }
        let clock = moment("2021-11-28 15:55");
        render(<BrowserRouter>
            <NavBar user={user} clock={clock} setClock={() => jest.fn()} setUser={() => jest.fn()} setCart={() => jest.fn()} showCart={true} cart={[]} />
        </BrowserRouter>);

        act(() => {
            fireEvent.click(screen.getByTestId("my_logout"));
        });
        var button = screen.getByText("Logout");
        expect(button).toBeInTheDocument();
        act(() => {
            fireEvent.click(screen.getByText("Logout"));
        });
        expect(window.location.pathname==="/login");


    })

})