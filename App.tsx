import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import RegisterScreen from './src/components/register/RegisterScreen';
import LogIn from './src/components/Login';
import { UbademyTheme, NavigationTheme } from './src/constants/themes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={UbademyTheme}>
      <StatusBar style='light' />
      <NavigationContainer theme={NavigationTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
          <Stack.Screen name='LogIn' component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('ubademy', () => App);
