import 'react-native-gesture-handler'; // DO NOT PUT ANYTHING ABOVE THIS IMPORT, THE DOCUMENTATION SAYS SO!

import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import { SignupScreen, LoginScreen,
  ProfileSetupScreen } from './src/components/register/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ROOT, LOGIN, SIGNUP, PROFILE_SETUP} from './src/routes';
import { AppRegistry, LogBox } from 'react-native';
import colors from './src/styles/colors';
import {UbademyTheme, NavigationTheme} from './src/styles/themes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Root from './src/components/Root';

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
