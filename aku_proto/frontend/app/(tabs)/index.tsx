import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, Image, View} from 'react-native';
import InputField from '../../components/NumberInputs';


export default function HomeScreen() {

  const router = useRouter();
  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");
  const [numberC, setNumberC] = useState("");

  const [numberAerr, setNumberAerr] = useState("");
  const [numberBerr, setNumberBerr] = useState("");
  const [numberCerr, setNumberCerr] = useState("");

  
  function onPressFunction(){
    if (numberA.trim() !== "" && numberB.trim() !== "" && numberC.trim() !== "") {
      sendToBackend();
    }
  }

  const validInputA = (value: string) => {
    setNumberA(value);
    setNumberAerr(value ? "" : "Value cannot be empty");
  };

  const validInputB = (value: string) => {
    setNumberB(value);
    setNumberBerr(value ? "" : "Value cannot be empty");
  };

  const validInputC = (value: string) => {
    setNumberC(value);
    setNumberCerr(value ? "" : "Value cannot be empty");
  };

  const sendToBackend = async () => {
    try {
      const res = await fetch('http://172.17.9.66:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          valueA: numberA,
          valueB: numberB,
          valueC: numberC
         }),
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
      <View style={styles.header}>
        <Image source={require('../../assets/images/officl-aku.png')} style={styles.logo}></Image>
      </View>

        <View style={styles.fields}>
          <View style={styles.inputWrapper}>
            <InputField placeholder='Enter a number' value={numberA} onChangeText={validInputA} />
            <Text style={styles.subs}>{numberAerr || " "}</Text>
          </View>

          <View style={styles.inputWrapper}>
            <InputField placeholder='Enter a number' value={numberB} onChangeText={validInputB} />
            <Text style={styles.subs}>{numberBerr || " "}</Text>
          </View>

          <View style={styles.inputWrapper}>
            <InputField placeholder='Enter a number' value={numberC} onChangeText={validInputC} />
            <Text style={styles.subs}>{numberCerr || " "}</Text>
          </View>
        </View>

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
    marginTop: 0,
    color: 'black',
    paddingBottom: 30,

  },
  button: {
    backgroundColor: 'rgba(29, 133, 22, 1)',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 80,
  },

  buttonText: {
    fontWeight: '600',
  },

  logo: {
    height: '87%',
    width: '42%',
    marginTop: 10,
    marginHorizontal: 'auto',
  },

  header: {
    flexDirection: 'row',
    height: '12%',
    width: '100%',
  },

  fields: {
    flexDirection: 'column',
    marginVertical: 'auto',
    paddingTop: 50,
  },

  subs: {
    fontSize: 12,
    color: "red",
    marginTop: 0,
    marginLeft: 10,
  },

  inputWrapper: {
    height: 90, 
  },

});
