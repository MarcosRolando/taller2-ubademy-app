import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, AppRegistry} from 'react-native';
import {Provider as PaperProvider,
  DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import LogIn from './src/components/LogIn';
import Register from './src/components/Register';

// @ts-ignore
export const API_URL = Constants.manifest.extra.API_URL;
// The ignore comment is for suppressing the VSCode error

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
      <View style={styles.container}>
        <Register />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('ubademy', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: '40%',
    paddingHorizontal: '15%'
  },
});
