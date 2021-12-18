import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/MyLogin';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import MyLogin from '../components/MyLogin';
import renderWithRouter from './setupTestsRouter'



describe('Test login form', () => {
    test('Test login form appearance', async () => {
        render(<BrowserRouter>
                    <LoginForm setClock={() => jest.fn()} user={undefined} clock={"2021-11-22 08:32"} setUser={() => jest.fn()} />
            </BrowserRouter>);

        const usernameField = screen.getByPlaceholderText('Enter username');
        const passwordField = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');
        const homeButton = screen.getByText('Back');
        const signupLink = screen.getByText("Sign up");

        expect(usernameField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(homeButton).toBeInTheDocument();
        expect(signupLink).toBeInTheDocument();
    });
/*
    test('wrong login', async () => {
        render(<BrowserRouter>
                    <LoginForm setClock={() => jest.fn()} user={undefined} clock={"2021-11-22 08:32"} setUser={() => jest.fn()} />
            </BrowserRouter>);

        const usernameField = screen.getByPlaceholderText('Enter username');
        usernameField.setAttribute("value", "a")
        const passwordField = screen.getByPlaceholderText('Password');
        usernameField.setAttribute("value", "ajd2io")
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        //expect(screen.getByTestId("error")).toBeInTheDocument()
    });

    it("tests go back", async () => {
        renderWithRouter(<MyLogin setClock={() => jest.fn()} user={undefined} clock={"2021-11-22 08:32"} setUser={() => jest.fn()} />, "/login");
        
        let elem = screen.getByText("Back")
        fireEvent.click(elem)
        expect(window.location.pathname).toMatch('/login')
      });
      */
});