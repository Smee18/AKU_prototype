import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen9NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen9NavigationProp;
};

export default function WIScreen9({navigation}: Props) {

    const[isLight, setIsLight] = useState<string | null>(null);

    const handleLight = useCallback((value: string) => {
      setIsLight(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 10/10</Text>
            <GeneralQ 
                question="What is the household's main source of lighting? " 
                onSelect={handleLight}
                options={[  { id: '1', label: 'Pressure lamp', value: '0'},
                            { id: '2', label: 'Kerosene lamp', value: '0'},
                            { id: '3', label: 'Tim lamp', value: '0' },
                            { id: '4', label: 'Electricity', value: '1' },
                            { id: '5', label: 'Firewood', value: '0' },
                            { id: '6', label: 'Solar', value: '1' },
                            { id: '7', label: 'Candles', value: '0' },
                            { id: '8', label: 'Other', value: '0' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen8'></BackButton>
            <NextButton data={{isLight}} targetScreen='OutcomeScreen' currentScreen='WIScreen9' />
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
