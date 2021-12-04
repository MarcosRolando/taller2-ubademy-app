import 'react-native-gesture-handler'; // DO NOT PUT ANYTHING ABOVE THIS IMPORT, THE DOCUMENTATION SAYS SO!

import {StatusBar} from 'expo-status-bar';
import React, { useEffect } from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import { SignupScreen, LoginScreen,
  ProfileSetupScreen } from './src/components/register/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ROOT, LOGIN, SIGNUP, PROFILE_SETUP} from './src/routes';
import {AppRegistry, LogBox} from 'react-native';
import colors from './src/styles/colors';
import {UbademyTheme, NavigationTheme} from './src/styles/themes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Root from './src/components/Root';

import { getApps, initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArPPUfADD66LcZiH6_xFMltsJ7qB4BvGw",
  authDomain: "ubademy-ee2aa.firebaseapp.com",
  projectId: "ubademy-ee2aa",
  storageBucket: "ubademy-ee2aa.appspot.com",
  messagingSenderId: "252066049243",
  appId: "1:252066049243:web:e49b3b02fc3f5d5b6670fe",
  measurementId: "G-YKTHQBDKSD"
};

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={UbademyTheme}>
      <StatusBar style='light' />
      <SafeAreaProvider style={{backgroundColor: colors.background}}>
        <NavigationContainer theme={NavigationTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={LOGIN}>
            <Stack.Group>
              <Stack.Screen name={LOGIN} component={LoginScreen} />
              <Stack.Screen name={SIGNUP} component={SignupScreen} />
              <Stack.Screen name={PROFILE_SETUP} component={ProfileSetupScreen} />
            </Stack.Group>
            <Stack.Screen name={ROOT} component={Root} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('ubademy', () => App);
