import React from 'react';
import {faChalkboardTeacher, faUserFriends, faUserGraduate} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {Subheading, List} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from '../../styles/styles';
import { COURSE } from '../../routes';

const Courses = ({coursesData, navigation}: any) => {
  function renderCourses(coursesName : any) : any[] {
    const courses: any = [];
    for (let i = 0; i < coursesName.length; i++) {
      courses.push(
          <List.Item
          key={i}
          title={coursesName[i].name}
          onPress={() => navigation.navigate(COURSE)}/>,
      );
    }
    return courses;
  }

  const coursesStudent = renderCourses(coursesData.courseStudent);
  const courseProfessor = renderCourses(coursesData.courseProfessor);
  const courseCollaborator = renderCourses(coursesData.courseCollaborator);

  return (
    <View>
      <Subheading style={styles.profileSubtitle}>
          Courses
      </Subheading>
      <List.Accordion
        title="Student"
        left={(props) => <List.Icon {...props}
          icon={(props) => <List.Icon {...props} icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faUserGraduate } />
          )} />} />}>
        {coursesStudent}
      </List.Accordion>
      <List.Accordion
        title="Teacher"
        left={(props) => <List.Icon {...props}
          icon={(props) => <List.Icon {...props} icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faChalkboardTeacher } />
          )} />} />}>
        {courseProfessor}
      </List.Accordion>
      <List.Accordion
        title="Collaborator"
        left={(props) => <List.Icon {...props}
          icon={(props) => <List.Icon {...props} icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faUserFriends } />
          )} />} />}>
        {courseCollaborator}
      </List.Accordion>
    </View>
  );
};

export default Courses;
