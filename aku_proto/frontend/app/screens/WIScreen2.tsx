import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen2NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen2NavigationProp;
};

export default function WIScreen2({navigation}: Props) {

    const[isComputer, setIsComputer] = useState<string | null>(null);
    const[isBicycle, setIsBicycle] = useState<string | null>(null);
    const[isMotorbike, setIsMotorbike] = useState<string | null>(null);
    const[isCar, setIsCar] = useState<string | null>(null);

    const handleComputer = useCallback((value: string) => {
      setIsComputer(value);
    }, []);

    const handleBicycle = useCallback((value: string) => {
      setIsBicycle(value);
    }, []);

    const handleMotorbike = useCallback((value: string) => {
      setIsMotorbike(value);
    }, []);

    const handleCar = useCallback((value: string) => {
      setIsCar(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 2/9</Text>
            <BinaryQ question="Do you own a computer" onSelect={handleComputer}></BinaryQ>
            <BinaryQ question="Do you own a bicycle" onSelect={handleBicycle}></BinaryQ>
            <BinaryQ question="Do you own a motorbike" onSelect={handleMotorbike}></BinaryQ>
            <BinaryQ question="Do you own a car or truck" onSelect={handleCar}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen1'></BackButton>
            <NextButton data={{isComputer, isBicycle, isMotorbike, isCar}} targetScreen='WIScreen2bis' currentScreen='WIScreen2' />
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
