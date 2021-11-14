import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../../../styles/styles';
import ProfileEditor from './ProfileEditor';

const ProfileScreen = ({navigation}: any) => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileEditor style={styles.profile}/>
        </ScrollView>
      </View>
    );
}

export default ProfileScreen;