import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/entries';

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeScreen"> 
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>

  );
}


export default Navigator;