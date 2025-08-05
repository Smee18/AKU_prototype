import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';


export default function HomeScreen() {

  const router = useRouter();

  function onPressFunction(){
    console.log("Pressed")
    router.replace('/results');
  }

  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Welcome!</ThemedText>
        <Pressable onPress={onPressFunction} style={styles.button}>
          <ThemedText>Next</ThemedText>
        </Pressable>
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
  button: {

  }
});
