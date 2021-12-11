import React from 'react';
import { faChalkboardTeacher,
  faUserFriends,
  faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native';
import { Subheading, List } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '../../styles/styles';
import { COURSE_MENU } from '../../routes';

const Courses = ({ navigation, courses }: any) => {

  function renderCourses(coursesName : any) : any[] {
    const courses: any = [];
    for (let i = 0; i < coursesName.length; i++) {
      courses.push(
          <List.Item
          key={i}
          title={coursesName[i].title}
          onPress={() => navigation.navigate(
            COURSE_MENU, {id: coursesName[i]._id})}
          />,
      );
    }
    return courses;
  }

  const coursesStudent = renderCourses(courses.student);
  const courseProfessor = renderCourses(courses.creator);
  const courseCollaborator = renderCourses(courses.collaborator);

  return (
    <View>

      {(courses.student.length !== 0 ||
        courses.creator.length !== 0 ||
        courses.collaborator.length !== 0) ? (

        <Subheading style={styles.profileSubtitle}>
          Courses
        </Subheading>
          
      ) : <></> }

      {courses.student.length !== 0 ? (
        <List.Accordion
          title="Student"
          left={(props) => <List.Icon {...props}
            icon={(props) => <List.Icon {...props} icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faUserGraduate } />
            )} />} />}>
          {coursesStudent}
        </List.Accordion>
      ) : <></> }

      {courses.creator.length !== 0 ? (
        <List.Accordion
          title="Teacher"
          left={(props) => <List.Icon {...props}
            icon={(props) => <List.Icon {...props} icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faChalkboardTeacher } />
            )} />} />}>
          {courseProfessor}
        </List.Accordion>
      ) : <></> }

      {courses.collaborator.length !== 0 ? (
        <List.Accordion
          title="Collaborator"
          left={(props) => <List.Icon {...props}
            icon={(props) => <List.Icon {...props} icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faUserFriends } />
            )} />} />}>
          {courseCollaborator}
        </List.Accordion>
      ) : <></> }

    </View>
  );
};

export default Courses;
