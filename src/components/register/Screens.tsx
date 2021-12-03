import React from 'react';
import Signup from './Signup';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, 
    widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Login from './Login'; 
import ProfileSetup from './ProfileSetup';
import Exam from '../exams/exam/Exam';
import ExamCreateUpdate from '../exams/examCreateUpdate/ExamCreateUpdate';
import Course from '../course/viewCourse/Course';

export const SignupScreen = ({navigation}: any) => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Signup navigation={navigation} style={styles.screen}/>
        </ScrollView>
      </View>
    );
}

export const ProfileSetupScreen = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileSetup navigation={navigation} style={{...styles.screen, paddingHorizontal:wp(10)}}/>
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

export const CourseScreen = ({route, navigation}: any) => {
  const { id } = route.params;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Course id={id}/>
      </ScrollView>
    </View>
  );
}

export const ExamScreen = ({route, navigation}: any) => {
  const {title, onlyView} = route.params;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Exam title={title} onlyView={onlyView} />
      </ScrollView>
    </View>
  );
}

export const ExamCreateScreen = ({route, navigation}: any) => {
  const {id, name} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamCreateUpdate id={id} isEditing={false} name={name} />
      </ScrollView>
    </View>
  );
}

export const ExamUpdateScreen = ({route, navigation}: any) => {
  const {id, name} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamCreateUpdate id={id} isEditing={true} name={name} />
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
