import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Q6ScreenNavigationProp } from '../navigation/types';
import BackButton from '../components/backButton';
import NextButton from '../components/nextButton';

type Props = {
  navigation: Q6ScreenNavigationProp;
};

const labels = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];

export default function Q6Screen({ navigation }: Props) {
  const [value, setValue] = useState(2);

  const snapTo = (val: number) => {
    const snapped = Math.round(val);
    setValue(snapped);
  };

  return (
    <SafeAreaView style={styles.page}>
      {/* Content container */}
      <View style={styles.content}>
        <Text style={styles.desc}>
          Over the last 2 weeks, how often have you been bothered by the following:
        </Text>

        <Text style={styles.question}>Feeling bad about yourself - or that you are a failure or have let yourself or your family down</Text>

        <View style={styles.sliderSection}>
          <Text style={styles.label}>{labels[value - 1]}</Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={1}
            maximumValue={4}
            step={1}
            value={value}
            onValueChange={snapTo}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#1E90FF"
          />
        </View>
      </View>

      {/* Footer container */}
      <View style={styles.footer}>
        <BackButton targetScreen='Q5Screen' />
        <NextButton data={{value}} targetScreen='Q7Screen' currentScreen='Q6Screen' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  desc: {
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  sliderSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
});
