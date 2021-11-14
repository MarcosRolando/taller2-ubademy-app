import React from 'react';
import {faFolder} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {Subheading, List} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from '../../styles/styles';

const Courses = ({coursesData}: any) => {
  function renderCourses(coursesName : any) : any[] {
    const courses: any = [];
    for (let i = 0; i < coursesName.length; i++) {
      courses.push(
          <List.Item key={i} title={coursesName[i].name} />,
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
        title="Courses as a student"
        left={(props) => <List.Icon {...props}
          icon={(props) => <List.Icon {...props} icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faFolder } />
          )} />} />}>
        {coursesStudent}
      </List.Accordion>
      <List.Accordion
        title="Courses as a teacher"
        left={(props) => <List.Icon {...props}
          icon={(props) => <List.Icon {...props} icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faFolder } />
          )} />} />}>
        {courseProfessor}
      </List.Accordion>
      <List.Accordion
        title="Courses as a collaborator"
        left={(props) => <List.Icon {...props}
          icon={(props) => <List.Icon {...props} icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faFolder } />
          )} />} />}>
        {courseCollaborator}
      </List.Accordion>
    </View>
  );
};

export default Courses;
