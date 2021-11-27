import { render, screen } from '@testing-library/react';
import MyNewProducts from '../components/MyNewProducts'

test('renders app form', () => {
    render(<MyNewProducts />);
    var element = screen.getByPlaceholderText("Id");
    expect(element).toBeInTheDocument();
    
    element = screen.getByPlaceholderText("Name");
    expect(element).toBeInTheDocument();
  
    element = screen.getByPlaceholderText("Quantity");
    expect(element).toBeInTheDocument();
    
    element = screen.getByPlaceholderText("Farmer");
    expect(element).toBeInTheDocument();
    
    element = screen.getByPlaceholderText("Price");
    expect(element).toBeInTheDocument();

    element = screen.getByPlaceholderText("Availability");
    expect(element).toBeInTheDocument();
  
  });