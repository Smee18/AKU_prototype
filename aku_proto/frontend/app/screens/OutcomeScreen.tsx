import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OutcomeScreenNavigationProp } from '../navigation/types';
import BackButton from '../components/backButton';

type Props = {
  navigation: OutcomeScreenNavigationProp;
};

export default function OutcomeScreen({ navigation }: Props) {
  
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://172.17.8.254:8000/getScores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        setScore(data.score); 
        console.log(data);
      })
      .catch(err => {
        console.error("Error fetching scores:", err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>Model output:</Text>
        <Text
          style={[
            styles.scoreText,
            {
              color: score === 1 ? 'red' : 'green',
            },
          ]}
        >
          {score === 1 ? 'OFF-TRACK DEVELOPMENT' : 'ON-TRACK DEVELOPMENT'}
        </Text>
      </View>

      {/* Footer container */}
      <View style={styles.footer}>
        <BackButton targetScreen="BeginScreen" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 55
  },
});
