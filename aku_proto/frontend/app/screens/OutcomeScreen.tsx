import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OutcomeScreenNavigationProp } from '../navigation/types';
import BackButton from '../components/backButton';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: OutcomeScreenNavigationProp;
  route: RouteProp<{ OutcomeScreen: { score: number } }, 'OutcomeScreen'>;
};

export default function OutcomeScreen({ navigation, route }: Props) {
  const { score } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>Model output:</Text>
        <Text
          style={[
            styles.scoreText,
            { color: score === 1 ? 'red' : 'green' }
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
    alignItems: 'center' 
  },

  content: { 
    alignItems: 'center' 
  },

  titleText: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 20 
  },

  scoreText: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 80 
  },

  footer: { 
    position: 'absolute', 
    bottom: 40, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginLeft: 55 
  }
});
