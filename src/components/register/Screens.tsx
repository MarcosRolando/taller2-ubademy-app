import React from 'react';
import Signup from './Signup';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, 
    widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Login from './Login'; 
import Location from './Location';
import Courses from './Courses';

export const SignupScreen = ({navigation}: any) => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Signup navigation={navigation} style={styles.screen}/>
        </ScrollView>
      </View>
    );
}

export const LocationScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Location navigation={navigation} style={styles.screen}/>
      </ScrollView>
    </View>
  );
}

export const LoginScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Login navigation={navigation} style={styles.screen}/>
      </ScrollView>
    </View>
  );
}

export const CoursesScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Courses navigation={navigation} style={{...styles.screen, paddingHorizontal:wp(5)}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp(15), 
    paddingHorizontal: wp(15),
  },
});
