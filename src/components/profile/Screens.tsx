import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../constants/styles';
import Profile from './Profile';

const ProfileScreen = ({route, navigation}: any) => {
    const {ownProfile} = (route.params !== undefined) ? route.params : {ownProfile:false};

    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Profile ownProfile={ownProfile} style={styles.profile}/>
        </ScrollView>
      </View>
    );
}

export default ProfileScreen;
