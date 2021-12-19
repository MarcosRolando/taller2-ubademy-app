import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { PROFILE_EDITOR, PROFILE_INFO } from '../../routes';
import styles from '../../styles/styles';
import ChangeSubscription from './ChangeSubscription';
import Profile from './Profile';
import ProfileEditor from './profileEditor/ProfileEditor';

const ProfileStack = createNativeStackNavigator();

const ProfileInfoSreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile ownProfile
        style={styles.profile} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const ProfileEditorScreen = ({route, navigation}: any) => {
  const { name, location, likedCourses, image } = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileEditor _name={name} _location={location} _image={image}
          _likedCourses={likedCourses}
          navigation={navigation} style={styles.profile}/>
      </ScrollView>
    </View>
  );
}

export const ProfileScreen = ({navigation}: any) => {
    return (
      <ProfileStack.Navigator screenOptions={{headerShown: false}} initialRouteName={PROFILE_INFO}>
        <ProfileStack.Screen name={PROFILE_INFO} component={ProfileInfoSreen} />
        <ProfileStack.Screen name={PROFILE_EDITOR} component={ProfileEditorScreen} />
      </ProfileStack.Navigator>
    );
}

export const UserScreen = ({route, navigation}: any) => {
  const { userProfile } = route.params;
  
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile style={styles.profile} profileInfo={userProfile} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export const ChangeSubscriptionScreen = ({route, navigation}: any) => {
  const { subscription } = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChangeSubscription subscription={subscription} navigation={navigation} />
      </ScrollView>
    </View>
  );
}