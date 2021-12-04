import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {View, Image} from 'react-native';
import {COURSE, CREATE_UPDATE_COURSE,
   EXAM, EXAM_CREATE_UPDATE,
   EXPLORE, HOME, PROFILE, USER,
   COURSE_MENU, COURSE_MENU_EXAMS} from '../routes';
import {ProfileScreen, UserScreen} from './profile/Screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChalkboard, faSchool, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './home/Screens';
import {TouchableHighlight} from 'react-native-gesture-handler';
import { CreateUpdateCourseScreen,
  ExamCreateUpdateScreen,
  ExamScreen, MenuScreen,
  ViewCourseScreen, MenuExamsScreen } from './course/Screens';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

// I define a custom one to add the Ubademy Logo (and the button that it represents), see the documentation
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableHighlight
        onPress={() => props.navigation.navigate(HOME)}
        underlayColor={colors.underlay}
        style={{width: wp(20), borderRadius: 20, alignSelf: 'center'}}
        >
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
      <HomeStack.Screen name={COURSE} component={ViewCourseScreen} />
      <HomeStack.Screen name={COURSE_MENU} component={MenuScreen} />
      <HomeStack.Screen name={COURSE_MENU_EXAMS} component={MenuExamsScreen} />
      <HomeStack.Screen name={EXAM} component={ExamScreen} />
      <HomeStack.Screen name={EXAM_CREATE_UPDATE} component={ExamCreateUpdateScreen} />
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
      <Drawer.Screen 
        name={CREATE_UPDATE_COURSE}
        component={CreateUpdateCourseScreen}
        initialParams={{id:"", isEditing:false}}
        options={{
          drawerIcon: ({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faChalkboard } />
      )}}/>
      <Drawer.Screen
        name={PROFILE}
        component={ProfileScreen}
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
