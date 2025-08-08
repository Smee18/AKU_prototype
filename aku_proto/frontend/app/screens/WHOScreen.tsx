import React, { useState} from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View} from 'react-native';
import InputField from '../components/numberInputs.tsx';
import NextButton from '../components/nextButton.tsx';
import Dropdown from '../components/dropdownGender.tsx';
import { WHOScreenNavigationProp } from '../navigation/types.ts';

type Props = {
  navigation: WHOScreenNavigationProp;
};


export default function WHOScreen({navigation}: Props) {

  const [gender, setGender] = useState("")
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");

  const [genderErr, setGenderErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [weightErr, setWeightErr] = useState("");

  const validGender = (value: string) => {
    setGender(value);
    setGenderErr(value ? "" : "Gender cannot be empty");
  };

  const validAge = (value: string) => {
    setAge(value);
    setAgeErr(value ? "" : "Age cannot be empty");
  };

  const validWeight = (value: string) => {
    setWeight(value);
    setWeightErr(value ? "" : "Weight cannot be empty");
  };

  return (
    <SafeAreaView style={styles.titleContainer}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/officl-aku.png')} style={styles.logo}></Image>
      </View>

        <View style={styles.fields}>
          <View style={styles.inputWrapper}>
            <Dropdown onValueChange={validGender}></Dropdown>
            {genderErr ? <Text style={styles.subs}>{genderErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField placeholder='Enter the age in months' value={age} onChangeText={validAge} />
            {ageErr ? <Text style={styles.subs}>{ageErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField placeholder='Enter the weight in kg' value={weight} onChangeText={validWeight} />
            {weightErr ? <Text style={styles.subs}>{weightErr}</Text> : null}
          </View>
        </View>

      <View style={styles.footer}>
        <NextButton
        data={{ gender, age, weight }} 
        validate={() => {
          if (!gender.trim()) return 'A';
          if (!age.trim()) return 'B';
          if (!weight.trim()) return 'C';
          return null;
        }}
        targetScreen="Q1Screen"
        currentScreen="WHOScreen"
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

  footer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 40,
  marginRight: 50,

  },

});
