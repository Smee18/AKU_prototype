import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { PSScreen3NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: PSScreen3NavigationProp;
};

export default function PSScreen3({navigation}: Props) {

    const[isFriends, setIsFriends] = useState<string | null>(null);
    const[isFather, setIsFather] = useState<string | null>(null);
    const[isHigherEd, setIsHigherEd] = useState<string | null>(null);
    const[isTryNew, setIsTryNew] = useState<string | null>(null);

    const handleFriends = useCallback((value: string) => {
      setIsFriends(value);
    }, []);

    const handleFather = useCallback((value: string) => {
      setIsFather(value);
    }, []);

    const handleHigherEd = useCallback((value: string) => {
      setIsHigherEd(value);
    }, []);

    const handleTryNew = useCallback((value: string) => {
      setIsTryNew(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Physiosocial 3/13</Text>
            <BinaryQ question="Do you have any friends with children the same age as your child?" onSelect={handleFriends}></BinaryQ>
            <BinaryQ question="Does the father or adult male participate in raising him?" onSelect={handleFather}></BinaryQ>
            <BinaryQ question="Is there anyone in the household studying higher education?" onSelect={handleHigherEd}></BinaryQ>
            <BinaryQ question="Do you ever try new recipes your find on the radio, newspapers...?" onSelect={handleTryNew}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='PSScreen2'></BackButton>
            <NextButton data={{isFriends, isFather, isHigherEd, isTryNew}} targetScreen='PSScreen4' currentScreen='PSScreen3' />
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
