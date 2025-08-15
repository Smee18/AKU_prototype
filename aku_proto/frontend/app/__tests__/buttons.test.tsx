import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NextButton from '../components/nextButton';
import { useNavigation } from 'expo-router';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));


const mockNavigate = jest.fn();

// Mock useNavigation from expo-router
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useNavigation: jest.fn(),
}));

describe('NextButton navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  it('navigates to targetScreen', async () => {
    const targetScreen = 'Q6Screen';

    const { getByTestId } = render(
      <NextButton
        targetScreen={targetScreen}
      />
    );

    fireEvent.press(getByTestId('next-button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        targetScreen
      );
    });
  });
});
