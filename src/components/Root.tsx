import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {View, Image} from 'react-native';
import {EXPLORE, HOME, PROFILE, USER} from '../routes';
import {ProfileScreen, UserScreen} from './profile/Screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSchool, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './home/Screens';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ProfileEditor from './profile/profileEditor/ProfileEditor';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

// I define a custom one to add the Ubademy Logo (and the button that it represents), see the documentation
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableHighlight
        onPress={() => props.navigation.navigate(HOME)}
        underlayColor={colors.background}>
        <View style={{height: hp(10), marginVertical: hp(2)}}>
          <Image
            source={require('../../assets/ubademy-logo.png')}
            style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
          />
        </View>
      </TouchableHighlight>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const ExploreScreen = ({navigation}: any) => {
  return (
    <HomeStack.Navigator initialRouteName={HOME} screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={HOME} component={HomeScreen} />
      <HomeStack.Screen name={USER} component={UserScreen} />
    </HomeStack.Navigator>
  );
};

const Root = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName={EXPLORE}
      screenOptions={homeOptions}>
      <Drawer.Screen name={EXPLORE} component={ExploreScreen} options={{
        drawerIcon: ({size, color}) => (
          <FontAwesomeIcon color={color} size={size} icon={ faSchool } />
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
