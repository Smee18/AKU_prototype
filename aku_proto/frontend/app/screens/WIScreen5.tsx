import React, {useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen5NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: WIScreen5NavigationProp;
};

export default function WIScreen5({navigation}: Props) {

    const handleRoof = useCallback(async (value: string) => {
      try {
        await AsyncStorage.setItem('Roof', value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 5/10</Text>
            <GeneralQ 
                question="What is the roof of the main dwelling predominantly made of?" 
                onSelect={handleRoof}
                options={[  { id: '1', label: 'Iron sheets', value: '1'},
                            { id: '2', label: 'Tiles', value: '1'},
                            { id: '3', label: 'Concrete', value: '1' },
                            { id: '4', label: 'Makuti', value: '0' },
                            { id: '5', label: 'Tin', value: '0' },
                            { id: '6', label: 'Other', value: '0' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen4'></BackButton>
            <NextButton targetScreen='WIScreen6'/>
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
