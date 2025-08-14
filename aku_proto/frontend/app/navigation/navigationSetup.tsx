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
import MotherInfoScreenA from '../screens/motherInfoScreenA';
import MotherInfoScreenB from '../screens/motherInfoScreenB';
import ClinicInfoScreen from '../screens/clinicInfoScreen';
import BeginScreen from '../screens/beginScreen';
import WIScreen1 from '../screens/WIScreen1';
import WIScreen2 from '../screens/WIScreen2';
import WIScreen2bis from '../screens/WIScreen2bis';
import WIScreen3 from '../screens/WIScreen3';
import WIScreen4 from '../screens/WIScreen4';
import WIScreen5 from '../screens/WIScreen5';
import WIScreen6 from '../screens/WIScreen6';
import WIScreen7 from '../screens/WIScreen7';
import WIScreen8 from '../screens/WIScreen8';
import WIScreen9 from '../screens/WIScreen9';

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
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="WIScreen9"> 
        <Stack.Screen name="BeginScreen" component={BeginScreen} />
        <Stack.Screen name="MotherInfoScreenA" component={MotherInfoScreenA} />
        <Stack.Screen name="MotherInfoScreenB" component={MotherInfoScreenB} />
        <Stack.Screen name="ClinicInfoScreen" component={ClinicInfoScreen} />
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
        <Stack.Screen name="WIScreen1" component={WIScreen1} />
        <Stack.Screen name="WIScreen2" component={WIScreen2} />
        <Stack.Screen name="WIScreen2bis" component={WIScreen2bis} />
        <Stack.Screen name="WIScreen3" component={WIScreen3} />
        <Stack.Screen name="WIScreen4" component={WIScreen4} />
        <Stack.Screen name="WIScreen5" component={WIScreen5} />
        <Stack.Screen name="WIScreen6" component={WIScreen6} />
        <Stack.Screen name="WIScreen7" component={WIScreen7} />
        <Stack.Screen name="WIScreen8" component={WIScreen8} />
        <Stack.Screen name="WIScreen9" component={WIScreen9} />
        <Stack.Screen name="OutcomeScreen" component={OutcomeScreen} />

      </Stack.Navigator>

  );
}


export default Navigator;