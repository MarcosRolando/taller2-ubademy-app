import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import { UbademyTheme, NavigationTheme } from './src/styling/themes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupScreen, LocationScreen, 
  CoursesScreen as RegisterCoursesScreen, LoginScreen } from './src/components/register/Screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from './src/styling/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={UbademyTheme}>
      <StatusBar style='light' />
      <SafeAreaProvider style={{ backgroundColor: colors.background}}> #This is because React Navigator is a piece of shit and gives me a fucking siezure with a white animation bug and this was the only stack overflow solution that worked. Fuck you React Navigator.
        <NavigationContainer theme={NavigationTheme}>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Group>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Signup' component={SignupScreen} />
              <Stack.Screen name='Location' component={LocationScreen} />
              <Stack.Screen name='RegisterCourses' component={RegisterCoursesScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('ubademy', () => App);
