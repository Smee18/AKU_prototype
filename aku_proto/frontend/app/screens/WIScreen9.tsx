import React, {useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen9NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WIScreen9NavigationProp;
};

export default function WIScreen9({navigation}: Props) {

    const handleFuel = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Fuel', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    const handleCook = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Kitchen', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);


    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 9/10</Text>
            <GeneralQ 
                question="What is the household's main source of cooking fuel?"
                onSelect={handleFuel}
                options={[  { id: '1', label: 'Firewood', value: '0'},
                            { id: '2', label: 'Kerosene', value: '0' },
                            { id: '3', label: 'Electricity', value: '1' },
                            { id: '4', label: 'Gas', value: '1' },
                            { id: '5', label: 'Charcoal', value: '0' },
                            { id: '6', label: 'Dung', value: '0' },
                            { id: '7', label: 'Other', value: '0' }]}>
            </GeneralQ>
    
            <GeneralQ 
                question="Where do you cook?"
                onSelect={handleCook}
                options={[  { id: '1', label: 'Kitchen', value: '1'},
                            { id: '2', label: 'Within the house', value: '0' },
                            { id: '3', label: 'Outside the house', value: '0' }]}>
            </GeneralQ>
    
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen8'></BackButton>
            <NextButton targetScreen='WIScreen10'/>
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
