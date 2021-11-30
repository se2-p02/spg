import MyEmployee from '../components/MyEmployee'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
const moment = require('moment');


let date = moment("2021-11-28 15:55");



describe('Test Employee page', () => {
    test('renders the employee starting page', () => {
        render(<MyEmployee />);
        var element = screen.getByText("Clients")
        expect(element).toBeInTheDocument();

        var element = screen.getByText("Products")
        expect(element).toBeInTheDocument();

        element = screen.getByText("Orders");
        expect(element).toBeInTheDocument();

    });
    test('e2e test employee', () => {
        
        render(
            <MemoryRouter history={history}>
                <MyEmployee user={undefined} setClock={() => jest.fn()} clock={date} />
            </MemoryRouter>
        );

        act(() => {
            fireEvent.click(screen.queryByText("Clients"));
        });
        expect(window.location.pathname === "/employee/clients")


    });
})

