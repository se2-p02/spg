import { render, screen } from '@testing-library/react';
import React from 'react'
import MyClientPage from '../components/MyClientPage'

test('renders app form', () => {
    render(<MyClientPage />);
    var element = screen.getByText("Profile")
    expect(element).toBeInTheDocument();
    
    var element = screen.getByText("Products")
    expect(element).toBeInTheDocument();
  
    element = screen.getByText("My Orders");
    expect(element).toBeInTheDocument();
  
  });