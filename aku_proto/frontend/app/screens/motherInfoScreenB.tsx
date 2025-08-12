import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../components/numberInputs.tsx';
import NextButton from '../components/nextButton.tsx';
import { MotherInfoScreenBNavigationProp } from '../navigation/types.ts';
import BackButton from '../components/backButton.tsx';

type Props = {
  navigation: MotherInfoScreenBNavigationProp;
};


export default function MotherInfoScreenB({navigation}: Props) {

    const [age, setAge] = useState("");
    const [ageErr, setAgeErr] = useState("");

    const [nbKids, setNbKids] = useState("");
    const [nbKidsErr, setNbKidsErr] = useState("");

    const [under5, setUnder5] = useState("");
    const [under5Err, setUnder5Err] = useState("");

    const [heightM, setHeightM] = useState("");
    const [heightMErr, setHeightMErr] = useState("");

    const [weightM, setWeightM] = useState("");
    const [weightMErr, setWeightMErr] = useState("");

    const validAge = (value: string) => {
      setAge(value);
      setAgeErr(value ? "" : "Age cannot be empty");
    };

    const validKids = (value: string) => {
      setNbKids(value);
      setNbKidsErr(value ? "" : "Number of children cannot be empty");
    };

    const validHeight = (value: string) => {
      setHeightM(value);
      setHeightMErr(value ? "" : "Height cannot be empty");
    };

    const validWeight = (value: string) => {
      setWeightM(value);
      setWeightMErr(value ? "" : "Weight cannot be empty");
    };

    const validUnder5 = useCallback((value: string) => {
        setUnder5(value);
        
        const numericValue = parseInt(value) || 0;
        const numericNbKids = parseInt(nbKids) || 0;

        if (!value) {
            setUnder5Err("Value cannot be empty");
        } 
        else if (numericValue > numericNbKids) {
            setUnder5Err("Value cannot be greater than number of children");
        }
        else {
            setUnder5Err("");
        }
    }, [nbKids]);


      return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mother Information</Text>
        </View>

        <View>
          <View style={styles.inputWrapper}>
            <InputField 
              head='Age' 
              placeholder='Enter your age' 
              value={age} 
              onChangeText={validAge}
            />
            {ageErr ? <Text style={styles.errorText}>{ageErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField 
              head='Height' 
              placeholder='Enter your height in cm' 
              value={heightM} 
              onChangeText={validHeight}
            />
            {heightMErr ? <Text style={styles.errorText}>{heightMErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField 
              head='Weight' 
              placeholder='Enter your weight in kg' 
              value={weightM} 
              onChangeText={validWeight}
            />
            {weightMErr ? <Text style={styles.errorText}>{weightMErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField 
              head='Children info' 
              placeholder='How many children do you have' 
              value={nbKids} 
              onChangeText={validKids}
            />
            {nbKidsErr ? <Text style={styles.errorText}>{nbKidsErr}</Text> : null}
          </View>

          <View style={styles.inputWrapper}>
            <InputField 
              placeholder='How many are under the age of 5' 
              value={under5} 
              onChangeText={validUnder5}
            />
            {under5Err ? <Text style={styles.errorText}>{under5Err}</Text> : null}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <BackButton targetScreen='MotherInfoScreenA' />
        <NextButton 
          data={{age, heightM, weightM, nbKids, under5}} 
          targetScreen='ClinicInfoScreen' 
          currentScreen='MotherInfoScreenB'
          validate={() => {
            if (!age.trim()) return 'A';
            if (!heightM.trim()) return 'B';
            if (!weightM.trim()) return 'C';
            if (!nbKids.trim()) return 'D';
            if (!under5.trim()) return 'E';
            if (parseInt(under5) > parseInt(nbKids)) return 'F';
            return null;
          }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  inputContainer: {
    marginBottom: 15,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  inputWrapper: {
    marginBottom: 15,
  },
});