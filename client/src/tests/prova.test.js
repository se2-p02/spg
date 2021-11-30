import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MyLogin from '../components/MyLogin';
import { MemoryRouter} from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

import { createMemoryHistory } from 'history';
import React from 'react';

describe('Test login form unit', () => {
    test('Test login form appearance', async () => {
      render(<BrowserRouter>
                <MyLogin user={undefined} setUser={() => jest.fn()} />
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
  
  });



describe('Test login form e2e', () => {

    test('Test filling out login form', () => {
        const history = createMemoryHistory();

        // mock push function
        history.push = jest.fn();

        render(
            <MemoryRouter history={history}>
                <MyLogin setUser={() => jest.fn()} user={undefined} />
            </MemoryRouter>
        );

        
        // insert a password shorter than 8 characters
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), {
                target: { value: 'p' },
            });
        });
        // Check for error message
        expect(screen.getByText('Should have some characters'));

        //Wrong user/password
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Enter username'), {
                target: { value: 'nino2@gmail.com' },
            });
        });
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), {
                target: { value: 'password2' },
            });
        });
        act(() => {
            fireEvent.click(screen.getByText('Login'));
        });
        // Check for error message
        expect(screen.queryByTestId("error"));


        // Fill out fields
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Enter username'), {
                target: { value: 'nino@gmail.com' },
            });
        });
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Password'), {
                target: { value: 'password' },
            });
        });
        //Click on the "Login" button after filling out fields
        act(() => {
            fireEvent.click(screen.getByText('Login'));
        });
    });
})