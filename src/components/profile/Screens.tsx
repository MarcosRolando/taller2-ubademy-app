import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../../styling/styles';
import Profile from './Profile';

export const ProfileScreen = ({navigation}: any) => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Profile ownProfile style={styles.profile}/>
        </ScrollView>
      </View>
    );
}

export const UserScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile style={styles.profile}/>
      </ScrollView>
    </View>
  );
};
