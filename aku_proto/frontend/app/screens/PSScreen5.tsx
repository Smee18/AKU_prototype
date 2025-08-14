import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { PSScreen5NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: PSScreen5NavigationProp;
};

export default function PSScreen5({navigation}: Props) {

    const[isClinicVisit, setIsClinicVisit] = useState<string | null>(null);

    const handleClinicVisit = useCallback((value: string) => {
      setIsClinicVisit(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 4/10</Text>
            <GeneralQ 
                question="In the last three months, how many times habe you taken your child to the clinic without him being sick?" 
                onSelect={handleClinicVisit}
                options={[  { id: '1', label: 'More than once', value: '1'},
                            { id: '2', label: 'Never', value: '0'},
                            { id: '3', label: 'He is still too young', value: '0' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='PSScreen4'></BackButton>
            <NextButton data={{isClinicVisit}} targetScreen='PSScreen6' currentScreen='PSScren5' />
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
