import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { PSScreen1NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: PSScreen1NavigationProp;
};

export default function PSScreen1({navigation}: Props) {

    const[isNews, setIsNews] = useState<string | null>(null);
    const[isToys, setIsToys] = useState<string | null>(null);
    const[isPlaceToPlay, setIsPlaceToPlay] = useState<string | null>(null);
    const[isNanny, setIsNanny] = useState<string | null>(null);

    const handleNews = useCallback((value: string) => {
      setIsNews(value);
    }, []);

    const handleToys = useCallback((value: string) => {
      setIsToys(value);
    }, []);

    const handlePlaceToPlay = useCallback((value: string) => {
      setIsPlaceToPlay(value);
    }, []);

    const handleNanny = useCallback((value: string) => {
      setIsNanny(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Mother Information</Text>
            <BinaryQ question="Do you like reading newspapers?" onSelect={handleNews}></BinaryQ>
            <BinaryQ question="Does your child have toys?" onSelect={handleToys}></BinaryQ>
            <BinaryQ question="Does your child have a place to play?" onSelect={handlePlaceToPlay}></BinaryQ>
            <BinaryQ question="In the last three months have you had a nanny?" onSelect={handleNanny}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen9'></BackButton>
            <NextButton data={{isNews, isToys, isPlaceToPlay, isNanny}} targetScreen='PSScreen2' currentScreen='PSScreen1' />
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

  subs: {
    fontSize: 12,
    color: "red",
    marginTop: 0,
    marginLeft: 10,
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
