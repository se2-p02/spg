import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/MyLogin';
import React from 'react'


describe('Test login form', () => {
  test('Test login form appearance', async () => {
    render(<LoginForm setClock={() => jest.fn()} user={undefined} clock={"2021-11-22 08:32"} setUser={() => jest.fn()} />);

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