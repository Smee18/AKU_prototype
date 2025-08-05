import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import InputField from '../components/numberInputs';
import { HomePageNavigationProp } from '../navigation/types';

type Props = {
    navigation: HomePageNavigationProp;
  
};

export default function HomeScreen({ navigation }: Props) {

  const [number, setNumber] = useState("");
  const fill = Number(number);

  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Welcome!</ThemedText>
        
        
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
          lineCap="round"
        />

      <InputField placeholder="Username" value={number} onChangeText={value => setNumber(value)}/>
      <ThemedText>Current Input: {number}</ThemedText>
      </ThemedView>
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
