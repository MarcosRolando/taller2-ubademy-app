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
import MenuExamsCorrection from './menu/menuExams/MenuExamsCorrection';
import ExamCorrection from '../exams/exam/ExamCorrection';
import MenuExamOptions from './menu/menuExams/MenuExamOptions';
import ExamCorrected from '../exams/exam/ExamCorrected';


export const CreateUpdateCourseScreen = ({route, navigation}: any) => {
  const {id, isEditing} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateUpdateCourse 
          id={id}
          isEditing={isEditing}
          navigation={navigation}
          style={styles.screen} />
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
  const {title, courseId, onlyView} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Exam
          title={title}
          courseId={courseId}
          onlyView={onlyView}
          navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export const ExamCreateUpdateScreen = ({route, navigation}: any) => {
  const {courseId, name, isEditing, questions} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamCreateUpdate
          courseId={courseId}
          canEdit={isEditing}
          examName={name}
          questions={questions}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}

export const ExamCorrectionScreen = ({route, navigation}: any) => {
  const {courseId, name, studentEmail, examTitle, canCorrect} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamCorrection
          courseId={courseId}
          canCorrect={canCorrect}
          examTitle={examTitle}
          studentEmail={studentEmail}
          navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export const ExamCorrectedScreen = ({route, navigation}: any) => {
  const {courseId, examName} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamCorrected
          courseId={courseId}
          examName={examName}
          navigation={navigation}
        />
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
  const {id, canEdit} = route.params;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuExams 
          id={id}
          canEdit={canEdit}
          navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

export const MenuExamsCorrectionScreen = ({route, navigation}: any) => {
  const {id} = route.params;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuExamsCorrection id={id} navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

export const MenuExamOptionsScreen = ({route, navigation}: any) => {
   const {courseId, examName} = route.params;

   return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MenuExamOptions
          courseId={courseId}
          examName={examName}
          navigation={navigation}
        />
      </ScrollView>
    </View>
   )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: hp(2),
    marginHorizontal: wp(15),
  },
});
