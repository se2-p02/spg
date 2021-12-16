import { render, screen } from '@testing-library/react';
import MyClientProfile from '../components/MyClientProfile'
import React from 'react'

test('renders the client profile', () => {
    render(<MyClientProfile />);
    var element = screen.getByTestId("profileName")
    expect(element).toBeInTheDocument();
    
    var element = screen.getByTestId("surname")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("email")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("role")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("wallet")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("phone")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("address")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("city")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("country")
    expect(element).toBeInTheDocument();

    var element = screen.getByTestId("back")
    expect(element).toBeInTheDocument();
    
    
  
  });