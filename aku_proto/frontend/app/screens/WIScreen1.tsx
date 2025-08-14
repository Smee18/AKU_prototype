import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen1NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen1NavigationProp;
};

export default function WIScreen1({navigation}: Props) {

    const[isRadio, setIsRadio] = useState<string | null>(null);
    const[isTV, setIsTV] = useState<string | null>(null);
    const[isVM, setIsVM] = useState<string | null>(null);
    const[isFridge, setIsFridge] = useState<string | null>(null);

    const handleRadio = useCallback((value: string) => {
      setIsRadio(value);
    }, []);

    const handleTV = useCallback((value: string) => {
      setIsTV(value);
    }, []);

    const handleVM = useCallback((value: string) => {
      setIsVM(value);
    }, []);

    const handleFridge = useCallback((value: string) => {
      setIsFridge(value);
    }, []);


    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index - 1/9</Text>
            <BinaryQ question="Do you own a radio" onSelect={handleRadio}></BinaryQ>
            <BinaryQ question="Do you own a television set" onSelect={handleTV}></BinaryQ>
            <BinaryQ question="Do you own a video machine" onSelect={handleVM}></BinaryQ>
            <BinaryQ question="Do you own a fridge or freezer" onSelect={handleFridge}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='Q9Screen'></BackButton>
            <NextButton data={{isRadio, isTV, isVM, isFridge}} targetScreen='WIScreen2' currentScreen='WIScreen1' />
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
