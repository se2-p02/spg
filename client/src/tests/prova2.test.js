import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MyNavBar from '../components/MyNavBar';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import 'jest-canvas-mock'

const moment = require('moment');

import { createMemoryHistory } from 'history';
import React from 'react';

let date = moment("2021-11-28 15:55");

describe('Test navbar unit', () => {
    test('Test login form appearance', async () => {
        render(<BrowserRouter><MyNavBar user={undefined} setUser={() => jest.fn()} setClock={() => jest.fn()} clock={date} showCart={true} setCart={() => jest.fn()} cart={[]} /></BrowserRouter>);

        const title = screen.getByText('Social Purchasing Group');
        const clock = screen.queryByTestId('clock')
        const field = screen.queryByTestId('dropdown')
        const iconPerson = screen.queryByTestId('logout')
        const cart = screen.queryByTestId('cart')
        const cartIcon = screen.queryByTestId('cartIcon')

        expect(title).toBeInTheDocument();
        expect(clock).toBeInTheDocument();
        expect(field).toBeInTheDocument();
        expect(iconPerson).toBeInTheDocument();
        expect(cart).toBeInTheDocument();
        expect(cartIcon).toBeInTheDocument();

    });

});



describe('Test navbar e2e', () => {
    test('Test click on cart', () => {
        const history = createMemoryHistory();

        // mock push function
        history.push = jest.fn();

        render(
            <MemoryRouter history={history}>
                <MyNavBar user={undefined} setUser={() => jest.fn()} setClock={() => jest.fn()} clock={date} showCart={true} setCart={() => jest.fn()} cart={[]} />
            </MemoryRouter>
        );

        act(() => {
            fireEvent.click(screen.queryByTestId('cart'));
        });
        expect(screen.queryByText("No products here"))
    });
    test('Test click on logout', () => {
        const history = createMemoryHistory();

        // mock push function
        history.push = jest.fn();

        render(
            <MemoryRouter history={history}>
                <MyNavBar user={undefined} setUser={() => jest.fn()} setClock={() => jest.fn()} clock={date} showCart={true} setCart={() => jest.fn()} cart={[]} />
            </MemoryRouter>
        );

        act(() => {
            fireEvent.click(screen.queryByTestId('logout'));
        });
        expect(screen.queryByText("Logout"))
    });
    test('Test do logout', () => {
        const history = createMemoryHistory();

        // mock push function
        history.push = jest.fn();

        render(
            <MemoryRouter history={history}>
                <MyNavBar user={undefined} setUser={() => jest.fn()} setClock={() => jest.fn()} clock={date} showCart={true} setCart={() => jest.fn()} cart={[]} />
            </MemoryRouter>
        );

        act(() => {
            fireEvent.click(screen.queryByTestId('logout'));
        });
        act(() => {
            fireEvent.click(screen.queryByText("Logout"));
        });
    });
})