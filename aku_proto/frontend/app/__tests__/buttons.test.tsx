import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalcButton from '../components/calculateButton';

// Mock the router to prevent errors from useRouter
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe('CalcButton - Validation', () => {
  it('calls onValidationError with "A" when numberA is empty', () => {
    const mockValidation = jest.fn();

    const { getByTestId } = render(
      <CalcButton
        numberA=""
        numberB="2"
        numberC="3"
        onValidationError={mockValidation}
      />
    );

    fireEvent.press(getByTestId('calc-button'));
    expect(mockValidation).toHaveBeenCalledWith('A');
  });

  it('calls onValidationError with "B" when numberB is empty', () => {
    const mockValidation = jest.fn();

    const { getByTestId } = render(
      <CalcButton
        numberA="1"
        numberB=""
        numberC="3"
        onValidationError={mockValidation}
      />
    );

    fireEvent.press(getByTestId('calc-button'));
    expect(mockValidation).toHaveBeenCalledWith('B');
  });

  it('calls onValidationError with "C" when numberC is empty', () => {
    const mockValidation = jest.fn();

    const { getByTestId } = render(
      <CalcButton
        numberA="1"
        numberB="2"
        numberC=""
        onValidationError={mockValidation}
      />
    );

    fireEvent.press(getByTestId('calc-button'));
    expect(mockValidation).toHaveBeenCalledWith('C');
  });
});
