import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Q8ScreenNavigationProp } from '../navigation/types';
import BackButton from '../components/backButton';
import NextButton from '../components/nextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: Q8ScreenNavigationProp;
};

const labels = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];

export default function Q8Screen({ navigation }: Props) {
  const [value, setValue] = useState(2);
  AsyncStorage.setItem('Q8', "2");

  const snapTo = async (val: number) => {
    const snapped = Math.round(val);
    setValue(snapped);
    try {
      await AsyncStorage.setItem('Q8', snapped.toString());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // saving error
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PHQ Questionnaire 8/9</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.desc}>
          Over the last 2 weeks, how often have you been bothered by the following:
        </Text>

        <Text style={styles.question}>Moving or speaking so slowly that other people could have noticed?
            Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual
        </Text>

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
        <BackButton targetScreen='Q7Screen' />
        <NextButton targetScreen='Q9Screen' />
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
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
