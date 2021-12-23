// @ts-nocheck
import 'react-native-gesture-handler'; // DO NOT PUT ANYTHING ABOVE THIS IMPORT, THE DOCUMENTATION SAYS SO!
import {StatusBar} from 'expo-status-bar';
import React, { useEffect } from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import { SignupScreen, LoginScreen,
  ProfileSetupScreen } from './src/components/register/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ROOT, LOGIN, SIGNUP, PROFILE_SETUP, CHAT_LIST} from './src/routes';
import { AppRegistry, LogBox, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import colors from './src/styles/colors';
import {UbademyTheme, NavigationTheme} from './src/styles/themes';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Root from './src/components/Root';
import { setExpoToken } from './src/expoToken';

// Firebase sets some timeers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const Stack = createNativeStackNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync('@marcosrolando/ubademyapp')).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App() {
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoToken(token);
    })();
  }, []);

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
