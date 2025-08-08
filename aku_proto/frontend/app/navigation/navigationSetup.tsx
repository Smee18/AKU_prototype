import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WHOScreen from '../screens/WHOScreen';
import Q1Screen from '../screens/Q1Screen';
import Q2Screen from '../screens/Q2Screen';
import Q3Screen from '../screens/Q3Screen';
import Q4Screen from '../screens/Q4Screen';
import Q5Screen from '../screens/Q5Screen';
import Q6Screen from '../screens/Q6Screen';
import Q7Screen from '../screens/Q7Screen';
import Q8Screen from '../screens/Q8Screen';
import Q9Screen from '../screens/Q9Screen';
import OutcomeScreen from '../screens/OutcomeScreen';

const Stack = createStackNavigator();

const Navigator = () => {
    /**
   * @remarks
   * Navigation setup
   * 
   * @import 
   * No fixed ammount as this is where we add any new pages
   *        

   *
   * @returns Navigation setup
    */

  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="WHOScreen"> 
        <Stack.Screen name="WHOScreen" component={WHOScreen} />
        <Stack.Screen name="Q1Screen" component={Q1Screen} />
        <Stack.Screen name="Q2Screen" component={Q2Screen} />
        <Stack.Screen name="Q3Screen" component={Q3Screen} />
        <Stack.Screen name="Q4Screen" component={Q4Screen} />
        <Stack.Screen name="Q5Screen" component={Q5Screen} />
        <Stack.Screen name="Q6Screen" component={Q6Screen} />
        <Stack.Screen name="Q7Screen" component={Q7Screen} />
        <Stack.Screen name="Q8Screen" component={Q8Screen} />
        <Stack.Screen name="Q9Screen" component={Q9Screen} />
        <Stack.Screen name="OutcomeScreen" component={OutcomeScreen} />

      </Stack.Navigator>

  );
}


export default Navigator;