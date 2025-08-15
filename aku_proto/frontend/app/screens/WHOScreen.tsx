import React, { useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../components/numberInputs.tsx';
import NextButton from '../components/nextButton.tsx';
import Dropdown from '../components/dropdownGender.tsx';
import { WHOScreenNavigationProp } from '../navigation/types.ts';
import BackButton from '../components/backButton.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WHOScreenNavigationProp;
};


export default function WHOScreen({navigation}: Props) {

  const [gender, setGender] = useState("")
  const [age, setAge] = useState("");
  const [weightB, setWeightB] = useState("");
  const [heightB, setHeightB] = useState("");
  const [head, setHead] = useState("");

  const [genderErr, setGenderErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [weightBErr, setWeightBErr] = useState("");
  const [heightBErr, setHeightBErr] = useState("");
  const [headErr, setHeadErr] = useState("");

  const validGender = async (value: string) => {
    setGender(value);
    setGenderErr(value ? "" : "Gender cannot be empty");
    try {
        await AsyncStorage.setItem('Baby gender', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
  };

  const validAge = async (value: string) => {
    setAge(value);

    const numericValue = parseInt(value) || 0;

    if(!value) {
      setAgeErr("Age cannot be empty");
    } else if (numericValue > 24) {
      setAgeErr("Age must between 0 and 24")
    } else {
      setAgeErr("");
    }
    try {
      await AsyncStorage.setItem('Child age (months)', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
      }
  
  };

  const validWeight = async (value: string) => {
    setWeightB(value);
    setWeightBErr(value ? "" : "Weight cannot be empty");
    try {
        await AsyncStorage.setItem('Baby Weight', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
  };

  const validHeight = async (value: string) => {
    setHeightB(value);
    setHeightBErr(value ? "" : "Height cannot be empty");
    try {
        await AsyncStorage.setItem('Baby Height', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
  };

  const validHead = async (value: string) => {
    setHead(value);
    setHeadErr(value ? "" : "Head circumference cannot be empty");
    try {
        await AsyncStorage.setItem('Head Circ', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
  };

  return (
    <SafeAreaView style={styles.titleContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Child Information</Text>
      </View>

        <View style={styles.fields}>
          <View style={styles.inputWrapper}>
            <Dropdown onValueChange={validGender}></Dropdown>
            {genderErr ? <Text style={styles.errorText}>{genderErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField head='Age' placeholder='Enter the age in months' value={age} onChangeText={validAge} />
            {ageErr ? <Text style={styles.errorText}>{ageErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField head='Weight' placeholder='Enter the weight in kg' value={weightB} onChangeText={validWeight} />
            {weightBErr ? <Text style={styles.errorText}>{weightBErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField head='Height' placeholder='Enter the height in cm' value={heightB} onChangeText={validHeight} />
            {heightBErr ? <Text style={styles.errorText}>{heightBErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField head='Head circumference' placeholder='Enter the head circumference in cm' value={head} onChangeText={validHead} />
            {headErr ? <Text style={styles.errorText}>{headErr}</Text> : null}
          </View>
        </View>

      <View style={styles.footer}>
        <BackButton targetScreen='ClinicInfoScreen' />
        <NextButton 
        validate={() => {
          if (!gender.trim()) return 'A';
          if (!age.trim()) return 'B';
          if (!weightB.trim()) return 'C';
          if (!heightB.trim()) return 'D';
          if (!head.trim()) return 'E';
          if (parseInt(age) > 24) return 'F';
          return null;
        }}
        targetScreen="Q1Screen"
      />
      </View>


    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%', 
    marginTop: 40, 
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

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  fields: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '77%',
    width: '100%', 
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  inputWrapper: {
    marginBottom: 15,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
  },

  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginLeft: 10,
  },

});
