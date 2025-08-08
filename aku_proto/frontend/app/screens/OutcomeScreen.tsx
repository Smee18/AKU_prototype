import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OutcomeScreenNavigationProp } from '../navigation/types';
import BackButton from '../components/backButton';

type Props = {
  navigation: OutcomeScreenNavigationProp;
};


export default function OutcomeScreen({ navigation }: Props) {
  const z_score = useLocalSearchParams().z_score;
  const q_score = useLocalSearchParams().q_score;
  //const result = useMemo(() => ColorbyNumber(number), [number]);
  //const fill = isNaN(Number(number)) ? 0 : Number(number);

  useEffect(() => {
    console.log("Received z score:", z_score);
    console.log("Received q_score", q_score)
  }, [z_score, q_score]);

  return (
    <SafeAreaView style={styles.titleContainer}>
      <Text style={styles.titleText}>Welcome!</Text>
      <Text>z_score: {z_score}</Text>
      <Text>q_score: {q_score}</Text>

      {/* Footer container */}
      <View style={styles.footer}>
        <BackButton targetScreen='WHOScreen' />
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
    width: '100%',
  },
  titleText: {
    marginTop: 20,
    color: 'black',
    paddingBottom: 30,
  },

  footer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 40,
  marginLeft: 50,

  },
});
