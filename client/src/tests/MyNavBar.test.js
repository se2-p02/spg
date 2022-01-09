import MyNavBar from '../components/MyNavBar'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from './setupTestsRouter'

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
            <MyNavBar account={true} user={user} clock={clock} setClock={() => jest.fn()} setShowModal={() => jest.fn()} setUser={() => jest.fn()} setCart={() => jest.fn()} showCart={true} cart={[]} />
        </BrowserRouter>);
        var element = screen.getByText("Social Purchasing Group")
        expect(element).toBeInTheDocument();



        element = screen.getByTestId("userImg")
        expect(element).toBeInTheDocument();
        act(() => fireEvent.click(element));
        expect(screen.getByText('Logout'));



        element = screen.getByTestId("cartIcon")
        expect(element).toBeInTheDocument();
        act(() => fireEvent.click(element));
        expect(screen.getByText('No products here'));


        element = screen.getByTestId("clockButton")
        expect(element).toBeInTheDocument();
        act(() => fireEvent.click(element));
        


    });

    test('renders cart', () => {
        const user = {
            id: 1,
            name: "nino",
            surname: "frassica",
            wallet: 1300
        }
        const clock = moment("2021-11-28 15:55");

        render(<BrowserRouter>
            <MyNavBar user={user} clock={clock} setClock={() => jest.fn()} setUser={() => jest.fn()} setCart={() => jest.fn()} showCart={true} cart={[{ id: 1, name: 'Milk', quantity: 2.0, unit: 'l' }]} />
        </BrowserRouter>);
        let element = screen.getByTestId("cartIcon")
        expect(element).toBeInTheDocument();
        act(() => fireEvent.click(element));
        element = screen.getByText('Place order')
        expect(element).toBeInTheDocument();
        act(() => fireEvent.click(element));
        expect(screen.getByTestId('orderBody')).toBeInTheDocument();
        expect(screen.getByTestId('methodForm')).toBeInTheDocument();
        expect(screen.getByTestId('orderForm')).toBeInTheDocument();
        act(() => fireEvent.click(screen.getByTestId('addressCheck')));
        expect(screen.getByTestId('addressBox')).toBeInTheDocument();
        act(() => fireEvent.click(screen.getByTestId('orderButton')));
        expect(screen.getByTestId('errorMsg')).toBeInTheDocument();
    });

    test("test logout", () => {
        let user = {
            id: 1,
            name: "admin",
            surname: "admin",
            wallet: 1300
        }
        let clock = moment("2021-11-28 15:55");
        render(<BrowserRouter>
            <MyNavBar account = {true} user={user} clock={clock} setClock={() => jest.fn()} setUser={() => jest.fn()} setCart={() => jest.fn()} showCart={true} cart={[]} />
        </BrowserRouter>);

        var element = screen.getByTestId("userImg")
        act(() => fireEvent.click(element));
        var button = screen.getByTestId("aaa");
        expect(button).toBeInTheDocument();
        act(() => {
            fireEvent.click(button);
        });
        expect(window.location.pathname).toBe("/");

    });

    it('test modal', async () => {
        renderWithRouter(<MyNavBar showCart={true} setCart={jest.fn()} setClock={jest.fn()} clock={moment('2021-11-18 09:55')} user={{ id: 1, role: "employee", username: "admin@admin.admin" }}
        cart={[{ id: 2, name: 'Milk', quantity: 2.0, unit: 'l' }, { id: 4, name: 'Flour', quantity: 1.0, unit: 'kg' }]}/>, '/employee');

        const cartBtn = screen.getByTestId('cartIcon');
        await waitFor(() => {
            act(() => fireEvent.click(cartBtn));
            expect(screen.getByTestId('removeBtn2')).toBeInTheDocument();
            act(() => fireEvent.click(screen.getByTestId('removeBtn2')));
        })
    })

})