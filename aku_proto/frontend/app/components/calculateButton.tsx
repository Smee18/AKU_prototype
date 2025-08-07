import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface CalcButtonProps {
  numberA: string;
  numberB: string;
  numberC: string;
  onValidationError?: (field: 'A' | 'B' | 'C') => void;
}

const CalcButton: React.FC<CalcButtonProps> = ({
  numberA,
  numberB,
  numberC,
  onValidationError,
}) => {
  const router = useRouter();

  const handleClick = async () => {
    if (!numberA.trim()) {
      onValidationError?.('A');
      return;
    }
    if (!numberB.trim()) {
      onValidationError?.('B');
      return;
    }
    if (!numberC.trim()) {
      onValidationError?.('C');
      return;
    }

    // Send to backend
    try {
      const res = await fetch('http://172.17.6.27:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valueA: numberA,
          valueB: numberB,
          valueC: numberC,
        }),
      });

      const json = await res.json();

      router.replace({
        pathname: '/(tabs)/results',
        params: { result: json.result },
      });
    } catch (err) {
      console.error("Failed to contact backend:", err);
    }
  };

  return (
    <Pressable onPress={handleClick} style={styles.button} testID="calc-button">
      <Text style={styles.buttonText}>Calculate</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(29, 133, 22, 1)',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 80,
  },
});

export default CalcButton;
