import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="home" color={color} />,
      }}
    />
    <Tabs.Screen
      name="results"
      options={{
        title: 'Explore',
        tabBarIcon: ({ color }: { color: string }) => <Ionicons size={28} name="paper-plane" color={color} />,
      }}
    />
    </Tabs>
  );
}
