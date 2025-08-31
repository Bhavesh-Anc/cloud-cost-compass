import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorForm from '../../frontend/src/components/CalculatorForm';

test('renders calculator form', () => {
  render(<CalculatorForm onCalculate={() => {}} />);
  
  const computeHeader = screen.getByText(/Compute Resources/i);
  expect(computeHeader).toBeInTheDocument();
  
  const storageHeader = screen.getByText(/Storage/i);
  expect(storageHeader).toBeInTheDocument();
  
  const bandwidthHeader = screen.getByText(/Bandwidth/i);
  expect(bandwidthHeader).toBeInTheDocument();
});

test('allows input of compute hours', () => {
  render(<CalculatorForm onCalculate={() => {}} />);
  
  const hoursInput = screen.getByLabelText(/Instance Hours/i);
  fireEvent.change(hoursInput, { target: { value: '720' } });
  
  expect(hoursInput.value).toBe('720');
});
