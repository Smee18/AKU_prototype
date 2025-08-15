import React, {useCallback} from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NextButtonProps {
  
  validate?: () => string | null;
  targetScreen: string;
}

const NextButton: React.FC<NextButtonProps> = ({
  validate,
  targetScreen,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

    const getAllStoredData = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys(); // All keys
      const result = await AsyncStorage.multiGet(keys); // [ [key, value], ... ]
      
      // Convert array to an object
      const dataObject: Record<string, string> = {};
      result.forEach(([key, value]) => {
        if (value !== null) {
          dataObject[key] = value;
        }
      });

      return dataObject;
    } catch (error) {
      console.error("Error retrieving AsyncStorage data:", error);
      return {};
    }
  }, []);


  const handleClick = async () => {
    const invalidField = validate?.();
    if (invalidField) {
      console.warn(`Invalid field: ${invalidField}`);
      return;
    }

    if (targetScreen === "OutcomeScreen") {
      const allData = await getAllStoredData();
      console.log("Trying to send", allData)

      try {
        const res = await fetch('http://172.17.8.254:8000/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({allData}),
        });

        const json = await res.json();
        navigation.navigate(targetScreen, { score: json.score });
      } catch (err) {
        console.error('Failed to contact backend:', err);
      }

      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared successfully.');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
      
    } else {
      navigation.navigate(targetScreen);
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
