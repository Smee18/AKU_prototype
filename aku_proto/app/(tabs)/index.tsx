import { Text } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import InputField from '../../components/numberInputs';


export default function HomeScreen() {

  const router = useRouter();
  const [number, setNumber] = useState("");

  
  const handleChangeText = (value: string) => {
    setNumber(value);
  };

  function onPressFunction(){
    console.log("Pressed")
    router.replace({pathname: '/(tabs)/results', 
                    params: {value: number}})
  }

  return (
    <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome!</Text>
        <InputField placeholder="Enter a number" value={number} onChangeText={handleChangeText}/>
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
    marginBottom: 30,
  },

  buttonText: {
    fontWeight: '600',
  },
});
