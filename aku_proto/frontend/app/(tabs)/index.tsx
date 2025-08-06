import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import InputField from '@/components/NumberInputs';


export default function HomeScreen() {

  const router = useRouter();
  const [number, setNumber] = useState("");

  
  const handleChangeText = (value: string) => {
    setNumber(value);
  };

  function onPressFunction(){
    console.log("Pressed");
    console.log({number})
    sendToBackend();
  }

  const sendToBackend = async () => {
    try {
      const res = await fetch('http://172.17.9.66:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: number }),
      });

      const json = await res.json();
      console.log("Received", json.result);

      router.replace({
        pathname: '/(tabs)/results',
        params: { result: json.result },
      });
    } catch (error) {
      console.error("Failed to contact backend:", error);
    }
  };


  return (
    <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome!</Text>
        <InputField placeholder='Enter a number' value={number} onChangeText={handleChangeText}></InputField>
        <Pressable onPress={onPressFunction} style={styles.button}>
          <Text style={styles.buttonText}>Calculate</Text>
        </Pressable>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },

  titleText: {
    marginTop: 20,
    color: 'black',
    paddingBottom: 30,

  },
  button: {
    backgroundColor: 'darkgreen',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 80,
  },

  buttonText: {
    fontWeight: '600',
  },
});
