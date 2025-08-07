import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ColorbyNumber from '../components/colorByNumber';


export default function OutcomeScreen() {
  const number = useLocalSearchParams().result as string;
  const result = useMemo(() => ColorbyNumber(number), [number]);
  const fill = isNaN(Number(number)) ? 0 : Number(number);

  useEffect(() => {
    console.log("Received number:", number);
  }, [number]);

  return (
    <SafeAreaView style={styles.titleContainer}>
      <Text style={styles.titleText}>Welcome!</Text>

      <AnimatedCircularProgress
        key={fill}
        size={120}
        width={15}
        backgroundWidth={5}
        prefill={0}
        fill={fill}
        tintColor={result.color} // dynamically set
        backgroundColor="#3d5875"
        arcSweepAngle={240}
        rotation={240}
        duration={1000}
        lineCap="round"
      />

      <Text style={{ color: result.color }}>{result.text}</Text>
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
});
