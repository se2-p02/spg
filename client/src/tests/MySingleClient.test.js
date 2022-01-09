import { render, screen } from '@testing-library/react';
import MySingleClient from '../components/MySingleClient';
import React from 'react'


test('renders the info of a client from employee page', () => {
    render(<MySingleClient />);
    
    var element = screen.getByTestId("profileName")
    expect(element).toBeInTheDocument();

    
    element = screen.getByTestId("Surname")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Email")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Role")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Wallet")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Phone")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Address")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("City")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Country")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Back")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("Orders")
    expect(element).toBeInTheDocument();
  
    element = screen.getByTestId("plus")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("minus")
    expect(element).toBeInTheDocument();
    
  });