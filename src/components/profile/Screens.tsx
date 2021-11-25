import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { COURSE, PROFILE_EDITOR, PROFILE_INFO } from '../../routes';
import styles from '../../styles/styles';
import Course from '../courseView/Course';
import Profile from './Profile';
import ProfileEditor from './profileEditor/ProfileEditor';

const ProfileStack = createNativeStackNavigator();

const ProfileInfoSreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile ownProfile style={styles.profile} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const ProfileEditorScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileEditor />
      </ScrollView>
    </View>
  );
}

export const ProfileScreen = ({navigation}: any) => {
    return (
      <ProfileStack.Navigator screenOptions={{headerShown: false}} initialRouteName={PROFILE_INFO}>
        <ProfileStack.Screen name={PROFILE_INFO} component={ProfileInfoSreen} />
        <ProfileStack.Screen name={PROFILE_EDITOR} component={ProfileEditorScreen} />
        <ProfileStack.Screen name={COURSE} component={CourseScreen} />
      </ProfileStack.Navigator>
    );
}

export const UserScreen = ({route, navigation}: any) => {
  const { email } = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile style={styles.profile} email={email} />
      </ScrollView>
    </View>
  );
};

export const CourseScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Course />
      </ScrollView>
    </View>
  );
}