import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import { UbademyTheme, NavigationTheme } from './src/constants/themes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupScreen, LocationScreen, 
  CoursesScreen as RegisterCoursesScreen, LoginScreen } from './src/components/register/Screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={UbademyTheme}>
      <StatusBar style='light' />
      <NavigationContainer theme={NavigationTheme}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Group screenOptions={{presentation:'card'}}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Location' component={LocationScreen} />
            <Stack.Screen name='RegisterCourses' component={RegisterCoursesScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('ubademy', () => App);
