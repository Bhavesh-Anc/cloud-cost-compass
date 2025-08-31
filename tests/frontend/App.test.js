import { render, screen } from '@testing-library/react';
import App from '../../frontend/src/App';

test('renders CloudCost Compass header', () => {
  render(<App />);
  const headerElement = screen.getByText(/CloudCost Compass/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders calculator tab by default', () => {
  render(<App />);
  const calculatorTab = screen.getByText(/Calculator/i);
  expect(calculatorTab).toBeInTheDocument();
});
