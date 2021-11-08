import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {View, Image} from 'react-native';
import {HOME, HOME_STACK, PROFILE, USER} from '../routes';
import {ProfileScreen, UserScreen} from './profile/Screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import colors from '../styling/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen as HomeStackScreen} from './home/Screens';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

// I only define a custom one to add the Ubademy Logo, see the documentation
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{height: hp(10), marginVertical: hp(2)}}>
        <Image
          source={require('../../assets/ubademy-logo.png')}
          style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const HomeScreen = ({navigation}: any) => {
  return (
    <HomeStack.Navigator initialRouteName={HOME_STACK} screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={HOME_STACK} component={HomeStackScreen} />
      <HomeStack.Screen name={USER} component={UserScreen} />
    </HomeStack.Navigator>
  );
};

const Root = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName={HOME}
      screenOptions={homeOptions}>
      <Drawer.Screen name={HOME} component={HomeScreen} options={{
        drawerIcon: ({size, color}) => (
          <FontAwesomeIcon color={color} size={size} icon={ faHome } />
        ),
      }} />
      <Drawer.Screen name={PROFILE} component={ProfileScreen}
        options={{
          drawerIcon: ({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faUserCircle } />
          )}}/>
    </Drawer.Navigator>
  );
};

export default Root;

const homeOptions = {
  headerTintColor: colors.primary,
};
