import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen5NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';
import BinaryQ from '../components/binaryQ.tsx';

type Props = {
  navigation: WIScreen5NavigationProp;
};

export default function WIScreen5({navigation}: Props) {

    const[isRoof, setIsRoof] = useState<string | null>(null);
    const[isRent, setIsRent] = useState<string | null>(null);

    const handleRoof = useCallback((value: string) => {
      setIsRoof(value);
    }, []);

    const handleRent = useCallback((value: string) => {
      setIsRent(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 5/9</Text>
            <GeneralQ 
                question="What is the floor of the main dwelling predominantly made of?"
                onSelect={handleRoof}
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
            <BackButton targetScreen='WIScreen4'></BackButton>
            <NextButton data={{isRoof, isRent}} targetScreen='WIScreen6' currentScreen='WIScreen5' />
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
