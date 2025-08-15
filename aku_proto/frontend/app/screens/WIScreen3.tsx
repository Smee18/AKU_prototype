import React, {useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen3NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WIScreen3NavigationProp;
};

export default function WIScreen3({navigation}: Props) {

    const handleCooker = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Cooker', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handlePhone = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Phone', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 3/10</Text>
            <BinaryQ question="Do you own a cooker?" onSelect={handleCooker}></BinaryQ>
            <BinaryQ question="Do you own a phone?" onSelect={handlePhone}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen2'></BackButton>
            <NextButton targetScreen='WIScreen4'/>
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
