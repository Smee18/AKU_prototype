import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen6NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';
import BinaryQ from '../components/binaryQ.tsx';

type Props = {
  navigation: WIScreen6NavigationProp;
};

export default function WIScreen6({navigation}: Props) {

    const[isToilet, setIsToilet] = useState<string | null>(null);
    const[isShared, setIsShared] = useState<string | null>(null);

    const handleToilet = useCallback((value: string) => {
      setIsToilet(value);
    }, []);

    const handleShared = useCallback((value: string) => {
      setIsShared(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 6/9</Text>
            <GeneralQ 
                question="What kind of toilet facility does your household have?"
                onSelect={handleToilet}
                options={[  { id: '1', label: 'Flush toilet', value: '1'},
                            { id: '2', label: 'Pit latrine', value: '0'},
                            { id: '3', label: 'Free range (bush/throw in a river)', value: '0' },
                            { id: '4', label: 'Other', value: '0' }]}>
            </GeneralQ>
            <BinaryQ question='Is this toilet facility shared (e.g. with neighbours)' onSelect={handleShared}></BinaryQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen5'></BackButton>
            <NextButton data={{isToilet, isShared}} targetScreen='WIScreen7' currentScreen='WIScreen6' />
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
