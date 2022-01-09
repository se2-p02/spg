import { render, screen } from '@testing-library/react';
import MyClientProfile from '../components/MyClientProfile'
import React from 'react'

test('renders the client profile', () => {
    render(<MyClientProfile />);
    var element = screen.getByTestId("profileName")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("profileName_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("img")
    expect(element).toBeInTheDocument();

    
    element = screen.getByTestId("surname")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("surname_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("email")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("email_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("role")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("wallet")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("phone")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("address")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("city")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("country")
    expect(element).toBeInTheDocument();


    element = screen.getByTestId("role_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("wallet_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("phone_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("address_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("city_val")
    expect(element).toBeInTheDocument();

    element = screen.getByTestId("country_val")
    expect(element).toBeInTheDocument();
  
  });