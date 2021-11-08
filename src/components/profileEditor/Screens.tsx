import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../constants/styles';
import ProfileEditor from './ProfileEditor';

const ProfileScreen = ({navigation}: any) => {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileEditor style={styles.profile}/>
        </ScrollView>
      </SafeAreaView>
    );
}

export default ProfileScreen;