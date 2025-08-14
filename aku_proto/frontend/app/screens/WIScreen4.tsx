import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen4NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen4NavigationProp;
};

export default function WIScreen4({navigation}: Props) {

    const[isRoof, setIsRoof] = useState<string | null>(null);

    const handleRoof = useCallback((value: string) => {
      setIsRoof(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 4/9</Text>
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
            <BackButton targetScreen='WIScreen3'></BackButton>
            <NextButton data={{isRoof}} targetScreen='WIScreen5' currentScreen='WIScreen4' />
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
