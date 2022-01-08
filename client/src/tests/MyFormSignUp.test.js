import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import MyFormSignUp from '../components/MyFormSignUp';
import React from 'react'
import renderWithRouter from './setupTestsRouter'
import moment from 'moment'


test('renders signup page', () => {
  render(<MyFormSignUp />);
  var element = screen.getByPlaceholderText("Email");
  expect(element).toBeInTheDocument();
  act(() => {
    fireEvent.click(screen.getByTestId('formBtn'));
    fireEvent.change(element, { target: { value: 'nino2@gmail.com' } });
  });

  element = screen.getByPlaceholderText("Name");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'Nino' } }));

  element = screen.getByPlaceholderText("Surname");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'Frassica' } }));

  element = screen.getByPlaceholderText("Password");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'ninofrassica' } }));

  element = screen.getByPlaceholderText("Repeat Password");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'ninofrassica' } }));

  element = screen.getByPlaceholderText("Phone number");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: '3333333333' } }));

  element = screen.getByPlaceholderText("Country");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'Italy' } }));

  element = screen.getByPlaceholderText("City");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'Torino' } }));

  element = screen.getByPlaceholderText("Address");
  expect(element).toBeInTheDocument();
  act(() => fireEvent.change(element, { target: { value: 'Via Roma, 21' } }));

  element = screen.getByText("Back")
  expect(element).toBeInTheDocument();

  element = screen.getByText("Register")
  expect(element).toBeInTheDocument();
  act(() => fireEvent.click(element));
});

it("tests go back with undefined user", async () => {
  renderWithRouter(<MyFormSignUp
    clock={moment('2021-11-27 7:55')}
    setClock={jest.fn()}
    setUser={jest.fn()}
    user={undefined} />, "/signup");

  let elem = screen.getByText("Back")
  fireEvent.click(elem)
  expect(window.location.pathname).toMatch('/login')
});

it("tests go back with a valid user", async () => {
  renderWithRouter(<MyFormSignUp
    setUser={jest.fn()}
    clock={moment('2021-11-27 7:55')}
    setClock={jest.fn()}
    user={{ id: 1, role: "client", username: "client@client.client", name: "client" }} />, "/signup");

  let elem = screen.getByText("Back")
  fireEvent.click(elem)
  expect(window.location.pathname).toMatch('/client')
});