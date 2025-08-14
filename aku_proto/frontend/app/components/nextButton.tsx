import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';

interface NextButtonProps {
  
  data: Record<string, any>;
  validate?: () => string | null;
  targetScreen: string;
  currentScreen: string;
}

const NextButton: React.FC<NextButtonProps> = ({
  data,
  validate,
  targetScreen,
  currentScreen,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleClick = async () => {
    const invalidField = validate?.();
    if (invalidField) {
      console.warn(`Invalid field: ${invalidField}`);
      return;
    }

    console.log("Trying to send", data)

    try {
      const res = await fetch('http://172.17.15.242:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({data, currentScreen}),
      });

      const json = await res.json();
      navigation.navigate(targetScreen, json);
    } catch (err) {
      console.error('Failed to contact backend:', err);
    }
  };

  return (
    <Pressable onPress={handleClick} style={styles.button} testID="next-button">
      <Text style={styles.buttonText}>Next</Text>
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
    flex: 1, 
    backgroundColor: 'rgba(29, 133, 22, 1)',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginLeft: 60,
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    
  },
});


export default NextButton;
