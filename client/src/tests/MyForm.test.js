import { render, screen } from '@testing-library/react';
import MyForm from '../components/MyForm';


test('renders sigup page', () => {
    render(<MyForm />);
    var element = screen.getByPlaceholderText("Email");
    expect(element).toBeInTheDocument();
    
    element = screen.getByPlaceholderText("Name");
    expect(element).toBeInTheDocument();
  
    element = screen.getByPlaceholderText("Surname");
    expect(element).toBeInTheDocument();
    
    element = screen.getByPlaceholderText("Password");
    expect(element).toBeInTheDocument();
    
    element = screen.getByPlaceholderText("Repeat Password");
    expect(element).toBeInTheDocument();

    element = screen.getByPlaceholderText("Phone number");
    expect(element).toBeInTheDocument();

    element = screen.getByPlaceholderText("Country");
    expect(element).toBeInTheDocument();

    element = screen.getByPlaceholderText("City");
    expect(element).toBeInTheDocument();

    element = screen.getByPlaceholderText("Address");
    expect(element).toBeInTheDocument();

    element = screen.getByText("Back")
    expect(element).toBeInTheDocument();

    element = screen.getByText("Register")
    expect(element).toBeInTheDocument();

  
  });