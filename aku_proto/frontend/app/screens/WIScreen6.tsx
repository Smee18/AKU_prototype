import React, {useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen6NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';
import BinaryQ from '../components/binaryQ.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WIScreen6NavigationProp;
};

export default function WIScreen6({navigation}: Props) {

    const handleFloor = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Floor', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handleRent = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Rent', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 6/10</Text>
            <GeneralQ 
                question="What is the floor of the main dwelling predominantly made of?"
                onSelect={handleFloor}
                options={[  { id: '1', label: 'Cement', value: '1'},
                            { id: '2', label: 'Tiles', value: '1'},
                            { id: '3', label: 'Wood', value: '1' },
                            { id: '4', label: 'Mud or earth', value: '0' },
                            { id: '5', label: 'Other', value: '0' }]}>
            </GeneralQ>
            <BinaryQ question='Do you live in a rented house?' onSelect={handleRent}></BinaryQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen5'></BackButton>
            <NextButton targetScreen='WIScreen7'/>
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
