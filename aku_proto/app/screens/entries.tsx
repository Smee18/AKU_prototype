import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { HomePageNavigationProp } from '../navigation/types';


type Props = {
    navigation: HomePageNavigationProp;
  
};

export default function HomeScreen({ navigation }: Props) {
  return (
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 100,
  },
});
