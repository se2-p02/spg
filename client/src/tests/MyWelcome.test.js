import MyWelcomePage from '../components/MyWelcomePage'
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './setupTestsRouter'



describe('Test employee', () => {

    test('renders the employee starting page', () => {
        renderWithRouter(
            <MyWelcomePage />
        );
        var element = screen.getByText("Welcome")
        expect(element).toBeInTheDocument();
        element = screen.getByText("Please select a page from the menu")
        expect(element).toBeInTheDocument();
    });

    test('test pop up', () => {
        renderWithRouter(
            <MyWelcomePage user={{ id: 1, role: "client", username: "admin@admin.admin" }}
            walletAlert={true}
            setWalletAlert={jest.fn()}/>
        );
        let element = screen.getByText("Insufficient balance")
        expect(element).toBeInTheDocument();
        element = screen.getByText("Your wallet balance is insufficient for one or more orders. Please check your wallet and your orders")
        expect(element).toBeInTheDocument();
        
        
    });

})