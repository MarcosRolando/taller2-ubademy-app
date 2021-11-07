import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View, Image } from "react-native";
import { HOME, PROFILE } from "../routes";
import ProfileScreen from "./profile/Screens";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import colors from "../styling/colors";
import Home from "./home/Home";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Drawer = createDrawerNavigator();

// I only define a custom one to add the Ubademy Logo, see the documentation
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{height:hp(10), marginVertical: hp(2)}}>
        <Image 
          source={require('../../assets/ubademy-logo.png')}
          style={{flex:1, resizeMode: 'contain', alignSelf:'center'}}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const HomeScreen = () => {
  return (
    <View>
      <Home />
    </View>
  );
}

const Root = () => {
  return (
    <Drawer.Navigator 
      drawerContent={CustomDrawerContent} 
      initialRouteName={HOME} 
      screenOptions={home_options}>
      <Drawer.Screen name={HOME} component={HomeScreen} options={{
        drawerIcon: ({ size, color }) => (
          <FontAwesomeIcon color={color} size={size} icon={ faHome } />
        ),
      }} />
      <Drawer.Screen name={PROFILE} component={ProfileScreen} initialParams={{ownProfile:true}} 
       options={{
        drawerIcon: ({ size, color }) => (
          <FontAwesomeIcon color={color} size={size} icon={ faUserCircle } />
        )}}/>
    </Drawer.Navigator>
  );
}

export default Root;

const home_options = {
  headerTintColor: colors.primary,
};
