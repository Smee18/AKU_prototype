import { Text } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';


export default function HomeScreen() {

  const router = useRouter();

  function onPressFunction(){
    console.log("Pressed")
    router.replace('./(test)/results');
  }

  return (
    <SafeAreaView style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome!</Text>
        <Pressable onPress={onPressFunction} style={styles.button}>
          <Text>Next</Text>
        </Pressable>
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
