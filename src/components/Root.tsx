// @ts-nocheck
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, { useEffect, useRef } from 'react';
import {View, Image} from 'react-native';
import {COURSE, CREATE_UPDATE_COURSE, EXAM, EXAM_CREATE_UPDATE, EXPLORE, HOME, PROFILE, USER, CHAT, CHAT_LIST, EXAM_CORRECTED, EXAM_CORRECTION, COURSE_REVIEWS, SUB_CHANGE, LOGIN} from '../routes';
import Fire from '../../Fire';
import * as Notifications from 'expo-notifications';
import {
  COURSE_MENU, COURSE_MENU_EXAMS,
  COURSE_MENU_EXAMS_CORRECTION,
  COURSE_MENU_EXAM_OPTIONS,
  COURSE_STUDENTS
} from '../routes';
import {ProfileScreen, UserScreen} from './profile/Screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChalkboard, faComments, faSchool, faUserCircle} from '@fortawesome/free-solid-svg-icons';
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
  ViewCourseScreen, MenuExamsScreen,
  MenuExamsCorrectionScreen, ExamCorrectionScreen,
  MenuExamOptionsScreen, ExamCorrectedScreen, MenuStudentsScreen, CourseReviewsScreen } from './course/Screens';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ChatListScreen, ChatScreen } from './Chats/Screens';
import { Button } from 'react-native-paper';
import { setUserCredentials } from '../userCredentials';
import { postLogOut } from '../scripts/logOut';

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

      <Button
        onPress={() => {
          postLogOut();
          setUserCredentials("", "");
          props.navigation.navigate(LOGIN);
        }}
      >
        Log out
      </Button>
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
      <HomeStack.Screen name={COURSE_MENU_EXAMS_CORRECTION} component={MenuExamsCorrectionScreen} />
      <HomeStack.Screen name={COURSE_MENU_EXAM_OPTIONS} component={MenuExamOptionsScreen} />
      <HomeStack.Screen name={COURSE_STUDENTS} component={MenuStudentsScreen} />
      <HomeStack.Screen name={COURSE_REVIEWS} component={CourseReviewsScreen} />
      <HomeStack.Screen name={EXAM} component={ExamScreen} />
      <HomeStack.Screen name={EXAM_CREATE_UPDATE} component={ExamCreateUpdateScreen} />
      <HomeStack.Screen name={CHAT} component={ChatScreen} />
      <HomeStack.Screen name={EXAM_CORRECTION} component={ExamCorrectionScreen} />
      <HomeStack.Screen name={EXAM_CORRECTED} component={ExamCorrectedScreen} />
    </HomeStack.Navigator>
  );
};

const Root = ({ navigation }: any) => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
        let otherUserEmail = response.notification.request.content.title.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)[0];
        let chatId = await Fire.getOrCreateChat(otherUserEmail, '');
        navigation.navigate(CHAT, { chatId, otherUserEmail })
      });
    })();

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

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
          headerTitle: 'Create a course',
          drawerLabel: 'Create a course',
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
      <Drawer.Screen
        name={CHAT_LIST}
        component={ChatListScreen}
        options={{
          headerTitle: 'Chats',
          drawerLabel: 'Chats',
          drawerIcon: ({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faComments } />
      )}}/>
    </Drawer.Navigator>
  );
};

export default Root;

const homeOptions = {
  headerTintColor: colors.primary,
  headerTitle: ''
};
