import { render, screen } from '@testing-library/react';
import MyFarmer from '../components/MyFarmer'
import React from 'react'

test('renders the farmer starting page', () => {
    render(<MyFarmer />);

    
    var element = screen.getByText("My orders")
    expect(element).toBeInTheDocument();
  
    element = screen.getByText("My products");
    expect(element).toBeInTheDocument();
  
  });