import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { PSScreen2NavigationProp } from '../navigation/types.ts';
import BinaryQ from '../components/binaryQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: PSScreen2NavigationProp;
};

export default function PSScreen2({navigation}: Props) {

    const[isPets, setIsPets] = useState<string | null>(null);
    const[isSpank, setIsSpank] = useState<string | null>(null);
    const[isHomeworkTalk, setIsHomeworkTalk] = useState<string | null>(null);
    const[isPlants, setIsPlants] = useState<string | null>(null);

    const handlePets = useCallback((value: string) => {
      setIsPets(value);
    }, []);

    const handleSpank = useCallback((value: string) => {
      setIsSpank(value);
    }, []);

    const handleHomeworkTalk = useCallback((value: string) => {
      setIsHomeworkTalk(value);
    }, []);

    const handlePlants = useCallback((value: string) => {
      setIsPlants(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Mother Information</Text>
            <BinaryQ question="Do you have any pets at home?" onSelect={handlePets}></BinaryQ>
            <BinaryQ question="Have you ever spanked your child?" onSelect={handleSpank}></BinaryQ>
            <BinaryQ question="Do you talk to your child when you do homework?" onSelect={handleHomeworkTalk}></BinaryQ>
            <BinaryQ question="Do you have any plants in your house?" onSelect={handlePlants}></BinaryQ>
          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='PSScreen1'></BackButton>
            <NextButton data={{isPets, isSpank, isHomeworkTalk, isPlants}} targetScreen='PSScreen3' currentScreen='PSScreen2' />
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
