import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CalculatorForm from '../../src/components/CalculatorForm';

describe('CalculatorForm', () => {
  it('submits form with correct values', () => {
    const mockSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <CalculatorForm onCalculate={mockSubmit} />
    );

    fireEvent.change(getByLabelText('Cloud Provider'), {
      target: { value: 'aws' }
    });
    
    fireEvent.change(getByLabelText('Service Type'), {
      target: { value: 'ec2' }
    });
    
    fireEvent.change(getByLabelText('Region'), {
      target: { value: 'us-east-1' }
    });
    
    fireEvent.change(getByLabelText('Hours'), {
      target: { value: '720' }
    });
    
    fireEvent.change(getByLabelText('Quantity'), {
      target: { value: '2' }
    });
    
    fireEvent.click(getByText('Calculate Cost'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      provider: 'aws',
      service: 'ec2',
      region: 'us-east-1',
      hours: 720,
      quantity: 2
    });
  });
});
