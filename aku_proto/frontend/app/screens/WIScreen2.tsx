import React, {useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen2NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WIScreen2NavigationProp;
};

export default function WIScreen2({navigation}: Props) {

    const handleComputer = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Computer', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
      }
    }, []);

    const handleBicycle = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Bicycle', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
      } 
    }, []);

    const handleMotorbike = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Motorbike', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handleCar = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Car', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 2/9</Text>
            <BinaryQ question="Do you own a computer?" onSelect={handleComputer}></BinaryQ>
            <BinaryQ question="Do you own a bicycle?" onSelect={handleBicycle}></BinaryQ>
            <BinaryQ question="Do you own a motorbike?" onSelect={handleMotorbike}></BinaryQ>
            <BinaryQ question="Do you own a car or truck?" onSelect={handleCar}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen1'></BackButton>
            <NextButton targetScreen='WIScreen3'/>
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
