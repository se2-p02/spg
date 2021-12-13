import { screen, fireEvent } from '@testing-library/react';
import React from 'react'
import MyWManager from '../components/MyWManager';
import { act } from "react-dom/test-utils"
import renderWithRouter from './setupTestsRouter'

test('renders the wmanager profile', () => {
    /*window.history.replaceState({}, '', "/wmanager")
    render(
        <BrowserRouter >
            <Routes>
                <Route path="/wmanager" element={<MyWManager />}></Route>
                <Route
                    path="*"
                    element={() => {
                        return (<></>);
                    }}
                />
            </Routes>
        </BrowserRouter >
    )
    */

    renderWithRouter(<MyWManager />, '/wmanager')

    var element = screen.getByTestId("myDeliveries")
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(window.location.pathname).toMatch('/wmanager/deliveries')

    /*
    const consoleSpy = jest.spyOn(console, 'log');
    console.log(window.location.pathname);
    expect(consoleSpy).toHaveBeenCalledWith('hello');
    */
});

test('go to ordersNotAvailable', () => {
    act(() => {
        renderWithRouter(<MyWManager />, '/wmanager')
    });

    var element = screen.getByTestId("ordersNotAvailable")
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(window.location.pathname).toMatch('/wmanager/notAvailableOrders')
});

test('go to availableOrders', () => {
    act(() => {
        renderWithRouter(<MyWManager />, '/wmanager')
    });

    var element = screen.getByTestId("available")
    expect(element).toBeInTheDocument();
    act(() => {
        fireEvent.click(element);
    });
    expect(window.location.pathname).toMatch('/wmanager/availableOrders')
});