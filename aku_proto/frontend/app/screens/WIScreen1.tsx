import React, {useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen1NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WIScreen1NavigationProp;
};

export default function WIScreen1({navigation}: Props) {


    const handleRadio = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Radio', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handleTV = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('TV', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handleVM = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('VM', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handleFridge = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Fridge', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);


    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index - 1/9</Text>
            <BinaryQ question="Do you own a radio?" onSelect={handleRadio}></BinaryQ>
            <BinaryQ question="Do you own a television set?" onSelect={handleTV}></BinaryQ>
            <BinaryQ question="Do you own a video machine?" onSelect={handleVM}></BinaryQ>
            <BinaryQ question="Do you own a fridge or freezer?" onSelect={handleFridge}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='Q9Screen'></BackButton>
            <NextButton targetScreen='WIScreen2'/>
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
