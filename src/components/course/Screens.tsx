import React from 'react';
import { ScrollView, View } from 'react-native';
import CreateUpdateCourse from './createUpdateCourse/CreateUpdateCourse';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Course from './viewCourse/Course';
import Exam from '../exams/exam/Exam';
import ExamCreateUpdate from '../exams/examCreateUpdate/ExamCreateUpdate';
import Menu from './menu/Menu';
import MenuExams from './menu/menuExams/MenuExams';
import MenuExamsEdit from './menu/menuExams/MenuExamsEdit';


export const CreateUpdateCourseScreen = ({route, navigation}: any) => {
  const {id, isEditing} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateUpdateCourse id={id} isEditing={isEditing} style={styles.screen} />
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

export const MenuScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Menu id={id} navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

export const MenuExamsScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuExams id={id} navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

export const MenuExamsEditScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuExamsEdit id={id} navigation={navigation}/>
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
