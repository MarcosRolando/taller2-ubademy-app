import React from 'react';
import { ScrollView, View } from 'react-native';
import CreateCourse from './createUpdateCourse/CreateUpdateCourse';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Course from './viewCourse/Course';
import Exam from '../exams/exam/Exam';
import ExamCreateUpdate from '../exams/examCreateUpdate/ExamCreateUpdate';


export const CreateCourseScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateCourse style={styles.screen} />
      </ScrollView>
    </View>
  );
}

export const ViewCourseScreen = ({route, navigation}: any) => {
  const { id } = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Course id={id} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export const ExamScreen = ({route, navigation}: any) => {
  const {title, onlyView} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Exam title={title} onlyView={onlyView} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export const ExamCreateUpdateScreen = ({route, navigation}: any) => {
  const {id, name, isEditing} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamCreateUpdate id={id} isEditing={isEditing} name={name} navigation={navigation} />
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
