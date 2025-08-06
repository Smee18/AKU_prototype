import { Text } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export function ColorbyNumber(number: string): {text: string, color: string} {
    if (Number(number) <= 33) {
      return {text: "Safe", color: "green"}
    }
    else if (Number(number) >= 66) {
      return {text: "Danger", color: "red"}
    } else {
      return {text: "Warning",color: "orange"}
    }
}

export default function OutcomeScreen() {

  const number = useLocalSearchParams().value as string;
  const result = useMemo(() => ColorbyNumber(number), [number]);
  const fill = Number(number);

  useEffect(() => {
    console.log(number)
    ColorbyNumber(number)
  },[number]);


  return (
    <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome!</Text>
        
        
        <AnimatedCircularProgress
          size={120}
          width={15}
          backgroundWidth={5}
          fill={fill}
          tintColor="#00ff00"
          // @ts-ignore
          tintColorSecondary="#ff0000"
          backgroundColor="#3d5875"
          arcSweepAngle={240}
          rotation={240}
          duration={1000}
          lineCap="round"
        />

      <Text style={{color: result.color}}>{result.text}</Text>
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
  titleText: {
    display: 'flex',
    marginTop: 20,
    color: 'black',
    paddingBottom: 30,

  },
});
