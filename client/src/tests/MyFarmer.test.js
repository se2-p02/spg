import { render, screen } from '@testing-library/react';
import MyFarmer from '../components/MyFarmer'

test('renders the farmer starting page', () => {
    render(<MyFarmer />);
    var element = screen.getByText("Profile")
    expect(element).toBeInTheDocument();
    
    var element = screen.getByText("Products")
    expect(element).toBeInTheDocument();
  
    element = screen.getByText("My products");
    expect(element).toBeInTheDocument();
  
  });