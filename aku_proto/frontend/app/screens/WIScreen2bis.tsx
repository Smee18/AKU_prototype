import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen2bisNavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen2bisNavigationProp;
};

export default function WIScreen2bis({navigation}: Props) {

    const[isCooker, setIsCooker] = useState<string | null>(null);
    const[isPhone, setIsPhone] = useState<string | null>(null);

    const handleCooker = useCallback((value: string) => {
      setIsCooker(value);
    }, []);

    const handlePhone = useCallback((value: string) => {
      setIsPhone(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 2/9</Text>
            <BinaryQ question="Do you own a cooker" onSelect={handleCooker}></BinaryQ>
            <BinaryQ question="Do you own a phone" onSelect={handlePhone}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen2'></BackButton>
            <NextButton data={{isCooker, isPhone}} targetScreen='WIScreen3' currentScreen='WIScreen2bis' />
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
