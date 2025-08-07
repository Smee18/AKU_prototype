import React, { useState} from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View} from 'react-native';
import InputField from '../components/numberInputs.tsx';
import CalcButton from '../components/calculateButton.tsx';

export default function HomeScreen() {

  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");
  const [numberC, setNumberC] = useState("");

  const [numberAerr, setNumberAerr] = useState("");
  const [numberBerr, setNumberBerr] = useState("");
  const [numberCerr, setNumberCerr] = useState("");

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

        <CalcButton
          numberA={numberA}
          numberB={numberB}
          numberC={numberC}
          onValidationError={(field) => {
            if (field === 'A') setNumberAerr('Value cannot be empty');
            if (field === 'B') setNumberBerr('Value cannot be empty');
            if (field === 'C') setNumberCerr('Value cannot be empty');
          }}
        />
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
