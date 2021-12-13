import { render, screen, fireEvent } from '@testing-library/react';
import MyForm from '../components/MyForm';
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


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

  it("tests go back with undefined user", async () => {
    renderWithRouter(<MyForm
        clock={moment('2021-11-27 7:55')}
        setClock={jest.fn()}
        setUser={jest.fn()}
        user={undefined} />, "/signup");
    
    let elem = screen.getByText("Back")
    fireEvent.click(elem)
    expect(window.location.pathname).toMatch('/login')
  });

  it("tests go back with a valid user", async () => {
    renderWithRouter(<MyForm
        setUser={jest.fn()}
        clock={moment('2021-11-27 7:55')}
        setClock={jest.fn()}
        user={{ id: 1, role: "client", username: "client@client.client", name: "client" }} />, "/signup");
    
    let elem = screen.getByText("Back")
    fireEvent.click(elem)
    expect(window.location.pathname).toMatch('/client')
  });