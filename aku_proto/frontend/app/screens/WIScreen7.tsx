import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen7NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen7NavigationProp;
};

export default function WIScreen7({navigation}: Props) {

    const[isSWater, setIsSWater] = useState<string | null>(null);
    const[isFWater, setIsFWater] = useState<string | null>(null);


    const handleSWater = useCallback((value: string) => {
      setIsSWater(value);
    }, []);

    const handleFWater = useCallback((value: string) => {
      setIsFWater(value);
    }, []);


    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 8/10</Text>
            <GeneralQ 
                question="What is the main source of water for members of your household?"
                onSelect={handleSWater}
                options={[  { id: '1', label: 'Piped in', value: '1'},
                            { id: '3', label: 'Public tap', value: '1' },
                            { id: '4', label: 'Open well', value: '0' },
                            { id: '5', label: 'Covered well', value: '1' },
                            { id: '6', label: 'Natural source (river,pond,lake...)', value: '0' }]}>
            </GeneralQ>
    
            <GeneralQ 
                question="How frequently is water available from this source? "
                onSelect={handleFWater}
                options={[  { id: '1', label: 'Always available', value: '1'},
                            { id: '3', label: 'Several hours per day', value: '1' },
                            { id: '4', label: 'Once or twice a week', value: '0' },
                            { id: '5', label: 'Infrequently', value: '0' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen6'></BackButton>
            <NextButton data={{isSWater, isFWater}} targetScreen='WIScreen8' currentScreen='WIScreen7' />
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
