import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { MotherInfoScreenANavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: MotherInfoScreenANavigationProp;
};

export default function MotherInfoScreenA({navigation}: Props) {

    const[isEdu, setIsEdu] = useState<string | null>(null);
    const[isMainEdu, setIsMainEdu] = useState<string | null>(null);
    const[isMarried, setIsMarried] = useState<string | null>(null);
    const[isMuslim, setIsMuslim] = useState<string | null>(null);

    const handleEdu = useCallback((value: string) => {
      setIsEdu(value);
    }, []);

    const handleMainEdu = useCallback((value: string) => {
      setIsMainEdu(value);
    }, []);

    const handleMarried = useCallback((value: string) => {
      setIsMarried(value);
    }, []);

    const handleMuslim = useCallback((value: string) => {
      setIsMuslim(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Mother Information</Text>
            <BinaryQ question="Have you received an education" onSelect={handleEdu}></BinaryQ>
            <BinaryQ question="Have you received a primary education" onSelect={handleMainEdu}></BinaryQ>
            <BinaryQ question="Are you married" onSelect={handleMarried}></BinaryQ>
            <BinaryQ question="Do you identify as a muslim" onSelect={handleMuslim}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='BeginScreen'></BackButton>
            <NextButton data={{isEdu, isMainEdu, isMarried, isMuslim}} targetScreen='MotherInfoScreenB' currentScreen='MotherInfoScreenA' />
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
  },

  subs: {
    fontSize: 12,
    color: "red",
    marginTop: 0,
    marginLeft: 10,
  },

  main: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '88%',
    width: '100%', 
    marginTop: 40, 
  },
  
  head: {
    fontWeight: 'bold',
    fontSize: 20,
  }

});
