import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';
//import LogIn from './src/components/LogIn';
import {Provider as PaperProvider,
  DarkTheme as PaperDarkTheme} from 'react-native-paper';

import Login from './src/components/Login';

// @ts-ignore
export const API_URL = Constants.manifest.extra.API_URL // The ignore comment is for suppressing the VSCode error

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <LogIn />
      <StatusBar style="auto" />
    </View>
  );
}
*/


const UbademyTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#3498db',
  },
};

export default function App() {
  return (
    <PaperProvider theme={UbademyTheme}>
      <Login />
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
