import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import NextButton from '../components/nextButton.tsx';
import { WIScreen3NavigationProp } from '../navigation/types.ts';
import GeneralQ from '../components/generalQ.tsx';
import BackButton from '../components/backButton';

type Props = {
  navigation: WIScreen3NavigationProp;
};

export default function WIScreen3({navigation}: Props) {

    const[isWall, setIsWall] = useState<string | null>(null);

    const handleWall = useCallback((value: string) => {
      setIsWall(value);
    }, []);

    return (
        <SafeAreaView style={styles.titleContainer}>

          <View style={styles.main}>
            <Text style={styles.head}>Wealth Index 4/10</Text>
            <GeneralQ 
                question="What are the walls of the main dwelling predominantly made of?" 
                onSelect={handleWall}
                options={[  { id: '1', label: 'Stone', value: '1'},
                            { id: '2', label: 'Bricks/Blocks', value: '1'},
                            { id: '3', label: 'Mud', value: '0' },
                            { id: '4', label: 'Wood', value: '0' },
                            { id: '5', label: 'Cement', value: '0' },
                            { id: '6', label: 'Iron sheets', value: '0' },
                            { id: '7', label: 'Tin', value: '0' },
                            { id: '8', label: 'Other', value: '0' }]}>
            </GeneralQ>

          </View>

            {/* Footer container */}
          <View style={styles.footer}>
            <BackButton targetScreen='WIScreen2'></BackButton>
            <NextButton data={{isWall}} targetScreen='WIScreen4' currentScreen='WIScreen3' />
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
