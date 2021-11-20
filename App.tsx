import 'react-native-gesture-handler'; // DO NOT PUT ANYTHING ABOVE THIS IMPORT, THE DOCUMENTATION SAYS SO!

import {StatusBar} from 'expo-status-bar';
import React, { useEffect } from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SignupScreen, LoginScreen, ProfileSetupScreen} from './src/components/register/Screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import colors from './src/styling/colors';
import {ROOT, LOGIN, SIGNUP, PROFILE_SETUP, COURSE} from './src/routes';
import {UbademyTheme, NavigationTheme} from './src/styling/themes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Root from './src/components/Root';
import Course from './src/components/course/Course';

const Stack = createNativeStackNavigator();


// export default function App() {
//   return (
//     <PaperProvider theme={UbademyTheme}>
//       <StatusBar style='light' />
//       <SafeAreaProvider style={{backgroundColor: colors.background}}>
//         <NavigationContainer theme={NavigationTheme}>
//           <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={LOGIN}>
//             <Stack.Group>
//               <Stack.Screen name={LOGIN} component={LoginScreen} />
//               <Stack.Screen name={SIGNUP} component={SignupScreen} />
//               <Stack.Screen name={PROFILE_SETUP} component={ProfileSetupScreen} />
//             </Stack.Group>
//             <Stack.Screen name={ROOT} component={Root} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </SafeAreaProvider>
//     </PaperProvider>
//   );
// }



export default function App() {
  
  return (
    <PaperProvider theme={UbademyTheme}>
      <StatusBar style='light' />

      <SafeAreaProvider style={{backgroundColor: colors.background}}>
        <NavigationContainer theme={NavigationTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={LOGIN}>
            <Stack.Screen name ={COURSE} component={Course} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('ubademy', () => App);
