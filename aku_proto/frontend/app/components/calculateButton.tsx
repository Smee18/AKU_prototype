import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface CalcButtonProps {
  gender: string;
  age: string;
  weight: string;
  onValidationError?: (field: 'A' | 'B' | 'C' ) => void;
}

const CalcButton: React.FC<CalcButtonProps> = ({
  gender,
  age,
  weight,
  onValidationError,
}) => {
  const router = useRouter();

  const handleClick = async () => {
    if (!gender.trim()) {
      onValidationError?.('A');
      return;
    }
    if (!age.trim()) {
      onValidationError?.('B');
      return;
    }
    if (!weight.trim()) {
      onValidationError?.('C');
      return;
    }

    console.log("Trying to send", gender, age, weight)
    // Send to backend
    try {
      const res = await fetch('http://172.17.15.144:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gender: gender,
          age: age,
          weight: weight,
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
