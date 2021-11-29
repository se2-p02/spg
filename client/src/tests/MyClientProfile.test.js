import { render, screen } from '@testing-library/react';
import MyClientProfile from '../components/MyClientProfile'
import React from 'react'

test('renders the client profile', () => {
    render(<MyClientProfile />);
    var element = screen.getByTestId("profileName")
    expect(element).toBeInTheDocument();
    
    var element = screen.getByText("Surname")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Email")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Role")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Wallet")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Phone")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Address")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("City")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Country")
    expect(element).toBeInTheDocument();

    var element = screen.getByText("Back")
    expect(element).toBeInTheDocument();
    
    
  
  });