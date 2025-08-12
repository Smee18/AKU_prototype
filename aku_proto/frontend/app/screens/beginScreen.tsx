import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
import { BeginScreenNavigationProp } from '../navigation/types';
import NextButton from '../components/nextButton';

type Props = {
  navigation: BeginScreenNavigationProp;
};

export default function BeginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/officl-aku.png')} 
          style={styles.image}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Welcome to Our Questionnaire</Text>
        
        <Text style={styles.description}>
          Please fill in the following fields about yourself and your child 
          so we can assist you in your situation.
        </Text>
        
        <Text style={styles.note}>
          None of your information will be stored.
        </Text>
      </View>

      <View style={styles.footer}>
        <NextButton 
          data={{}} 
          targetScreen='MotherInfoScreenA' 
          currentScreen='BeginScreen' 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  image: {
    height: 160,
    width: 330,
    marginBottom: 30,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  
  note: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginRight: 60,
  },
});