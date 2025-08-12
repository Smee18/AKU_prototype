import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { ClinicInfoScreenNavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import InputField from '../components/numberInputs.tsx';
import BackButton from '../components/backButton.tsx';

type Props = {
  navigation: ClinicInfoScreenNavigationProp;
};

export default function ClinicInfoScreen({navigation}: Props) {

    const[nbPreg, setNbPreg] = useState("");
    const[nbPregErr, setNbPregErr] = useState("");
    const[isNurse, setIsNurse] = useState<string | null>(null);
    const[isClinic, setIsClinic] = useState<string | null>(null);

    const handleNurse = useCallback((value: string) => {
      setIsNurse(value);
    }, []);

    const handleClinic = useCallback((value: string) => {
      setIsClinic(value);
    }, []);

    const validPreg = (value: string) => {
      setNbPreg(value);
      setNbPregErr(value ? "" : "Number of pregnancies cannot be empty");
    };


    return (
        <SafeAreaView style={styles.titleContainer}>
            <View style={styles.main}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Pregnancy Information</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <InputField placeholder='Enter your number of pregnancies' value={nbPreg} onChangeText={validPreg}></InputField>
                    {nbPregErr ? <Text style={styles.subs}>{nbPregErr}</Text> : null}
                </View>

                <BinaryQ question="Do you have access to a clinic for birth" onSelect={handleNurse}></BinaryQ>
                <BinaryQ question="Do you have access to an assistant nurse for birth" onSelect={handleClinic}></BinaryQ>
            </View>
 

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='MotherInfoScreenB' />
            <NextButton data={{nbPreg, isNurse, isClinic}} targetScreen='WHOScreen' currentScreen='MotherInfoScreenA'
                      validate={() => {
                    if (!nbPreg.trim()) return 'A';
                    return null;
                    }} />
          </View>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 30,
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

  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
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

});

