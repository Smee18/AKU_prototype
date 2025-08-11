import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NextButton from '../components/nextButton';
import { useNavigation } from 'expo-router';

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

    // Mock global fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ some: 'data' }),
      } as Response)
    ) as jest.Mock;
  });

  it('navigates to targetScreen with backend data', async () => {
    const data = { "score": 2 };
    const currentScreen = 'Q5Screen';
    const targetScreen = 'Q6Screen';

    const { getByTestId } = render(
      <NextButton
        data={data}
        currentScreen={currentScreen}
        targetScreen={targetScreen}
      />
    );

    fireEvent.press(getByTestId('next-button'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        targetScreen,
        { some: 'data' }
      );
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://172.17.10.40:8000/process',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ data, currentScreen }),
      })
    );
  });
});
