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
  const element = screen.getAllByPlaceholderText("Email");
  
});
