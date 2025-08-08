import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CalcButton from '../components/nextButton';

let mockReplaced: jest.Mock;

jest.mock('expo-router', () => {
  // Assign it inside the mock factory
  mockReplaced = jest.fn();

  return {
    useRouter: () => ({
      replace: mockReplaced,
    }),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: expect.any(Number) }),
    })
  ) as jest.Mock;
});

describe('CalcButton - Validation', () => {

  it('calls onValidationError with "A" when numberA is empty', () => {
    const mockValidation = jest.fn();

    const { getByTestId } = render(
      <CalcButton
        gender=""
        age="2"
        weight="3"
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
        gender="Male"
        age=""
        weight="3"
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
        gender="Female"
        age="2"
        weight=""
        onValidationError={mockValidation}
      />
    );

    fireEvent.press(getByTestId('calc-button'));
    expect(mockValidation).toHaveBeenCalledWith('C');
  });

  describe('Results page', () => {
    it('navigates to /results when Calculate is pressed', async () => {
      const mockValidation = jest.fn();

      const { getByTestId } = render(
      <CalcButton
        gender="Male"
        age="20"
        weight="5"
        onValidationError={mockValidation}
      />
    );
      fireEvent.press(getByTestId('calc-button'));

      await waitFor(() => {
        expect(mockValidation).not.toHaveBeenCalled();
        expect(mockReplaced).toHaveBeenCalledWith({
          pathname: '/(tabs)/results',
          params: {
            result: expect.any(Number),},
        });
      })
    });
  });
});