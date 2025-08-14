import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { PSScreen6NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: PSScreen6NavigationProp;
};

export default function PSScreen6({navigation}: Props) {

    const[isAble, setIsAble] = useState<string | null>(null);

    const handleAble = useCallback((value: string) => {
      setIsAble(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 4/10</Text>
            <GeneralQ 
                question="Is your child able to?" 
                onSelect={handleAble}
                options={[  { id: '1', label: 'Crawl', value: '1'},
                            { id: '2', label: 'Turn', value: '1'},
                            { id: '3', label: 'Feed himself', value: '1' },
                            { id: '4', label: 'Walk', value: '1' },
                            { id: '5', label: 'Colour', value: '1' },
                            { id: '6', label: 'Pronounce new words', value: '1' },
                            { id: '7', label: 'Sing songs or prayers', value: '1' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='PSScreen5'></BackButton>
            <NextButton data={{isAble}} targetScreen='PSScreen7' currentScreen='PSScren6' />
          </View>

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

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '88%',
    width: '100%', 
    marginTop: 40, 
  },
  
  head: {
    fontWeight: 'bold',
    fontSize: 20,
  }

});
