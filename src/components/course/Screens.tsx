import React from 'react';
import { ScrollView, View } from 'react-native';
import CreateCourse from './createCourse/CreateCourse';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Course from './viewCourse/Course';

export const CreateCourseScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateCourse style={styles.screen} />
      </ScrollView>
    </View>
  );
}

export const ViewCourseScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Course />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: hp(2),
    marginHorizontal: wp(15),
  },
});
