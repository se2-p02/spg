import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app homepage', () => {
  render(<App />);
  const element = screen.getByText(/test/i);
  expect(element).toBeInTheDocument();
});

