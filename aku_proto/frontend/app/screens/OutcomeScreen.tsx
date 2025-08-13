import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OutcomeScreenNavigationProp } from '../navigation/types';
import BackButton from '../components/backButton';

type Props = {
  navigation: OutcomeScreenNavigationProp;
};


export default function OutcomeScreen({ navigation }: Props) {
  const [scores, setScores] = useState<{ z_score: number; q_score: number }| null>(null);
  //const result = useMemo(() => ColorbyNumber(number), [number]);
  //const fill = isNaN(Number(number)) ? 0 : Number(number);

  useEffect(() => {

    fetch("http://172.17.1.107:8000/getScores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        setScores(data);
        console.log(data)
      })
      .catch(err => {
        console.error("Error fetching scores:", err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.titleContainer}>
      <Text style={styles.titleText}>Welcome!</Text>
      <Text>z_score: {scores?.z_score}</Text>
      <Text>q_score: {scores?.q_score}</Text>

      {/* Footer container */}
      <View style={styles.footer}>
        <BackButton targetScreen='BeginScreen' />
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
