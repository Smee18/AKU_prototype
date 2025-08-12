import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack';

interface BackButtonProps {
  targetScreen: string;
}

const BackButton: React.FC<BackButtonProps> = ({
    targetScreen, 
    }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleClick = () => {
    navigation.navigate(targetScreen); 
  };

  return (
    <Pressable onPress={handleClick} style={styles.button} testID="back-button">
      <Text style={styles.buttonText}>Back</Text>
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
    marginRight: 60, 
    marginTop: 'auto',
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 60,
  },
});


export default BackButton;
