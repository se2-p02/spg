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

})