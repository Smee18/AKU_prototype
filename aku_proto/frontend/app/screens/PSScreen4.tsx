import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { PSScreen4NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: PSScreen4NavigationProp;
};

export default function PSScreen4({navigation}: Props) {

    const[isTired, setIsTired] = useState<string | null>(null);

    const handleTired = useCallback((value: string) => {
      setIsTired(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 4/10</Text>
            <GeneralQ 
                question="What do you do when you child is tired?" 
                onSelect={handleTired}
                options={[  { id: '1', label: 'Give him something to eat', value: '0'},
                            { id: '2', label: 'Put him to bed to sleep a little', value: '0'},
                            { id: '3', label: 'Give him something to play with', value: '0' },
                            { id: '4', label: 'Encourage him to continue his work', value: '0' },
                            { id: '5', label: 'Play with him', value: '1' },
                            { id: '6', label: 'Breastfeed him', value: '0' },
                            { id: '7', label: 'Carry him', value: '0' },
                            { id: '8', label: 'Other', value: '0' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='PSScreen3'></BackButton>
            <NextButton data={{isTired}} targetScreen='PSScreen5' currentScreen='PSScren4' />
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
