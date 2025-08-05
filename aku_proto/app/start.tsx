import React from 'react';
import 'react-native-reanimated';
import Navigator from './navigation/navigationSetup';

const RootLayout = () => {
      /**
   * @remarks
   * Main section, should always stay empty as new pages are added under navigation
   *
   * @returns The App itself!
    */
  return <Navigator />;
};

export default RootLayout;
