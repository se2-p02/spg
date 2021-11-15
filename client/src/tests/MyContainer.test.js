import { render, screen } from '@testing-library/react';
import { Container } from 'react-bootstrap';

test('renders container path', () => {
  render(<Container />);
  const element = screen.getByText(/test/i);
  expect(element).toBeInTheDocument();
});
