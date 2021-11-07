import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { HOME, PROFILE } from "../routes";
import ProfileScreen from "./profile/Screens";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import colors from "../styling/colors";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <View>

    </View>
  );
}

const Home = () => {
  return (
    <Drawer.Navigator initialRouteName={PROFILE} screenOptions={home_options}>
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

export default Home;

const home_options = {
  headerTintColor: colors.primary,
};
