import { render, screen } from '@testing-library/react';
import App from '../App';
import MyForm from '../components/MyForm';

test('renders app homepage', () => {
  render(<App />);
  const element = screen.getByText(/test/i);
  expect(element).toBeInTheDocument();
});

test('renders app form', () => {
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

});
