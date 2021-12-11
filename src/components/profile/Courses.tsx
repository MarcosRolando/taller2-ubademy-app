import React, { useEffect } from 'react';
import { faChalkboardTeacher,
  faUserFriends,
  faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native';
import { Subheading, List } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '../../styles/styles';
import { COURSE_MENU } from '../../routes';
import { MY_COURSES } from '../../endpoints';
import { useFocusEffect } from '@react-navigation/native';
import { getMyCourses } from '../../scripts/profile';

//const ID_TEST = "61a7e42fd2398ad27a7d0099"; // TODO: que el baka-back nos mande los ids
//const ID_TEST = "61b15aa4dc7a666240da34ae";
const ID_TEST = "61b3f83126f2a6d0965df668";

const Courses = ({coursesData, navigation}: any) => {
  const [studentCourses, setStudentCourses] = 
    React.useState([] as Array <{_id: string, title: string}>);
  const [showStudentCourses, setShowStudentCourses] = React.useState(false);
  const [creatorCourses, setCreatorCourses] =
    React.useState([] as Array <{_id: string, title: string}>);
  const [showCreatorCourses, setShowCreatorCourses] = React.useState(false);
  const [collaboratorCourses, setCollaboratorCourses] =
    React.useState([] as Array <{_id: string, title: string}>);
  const [showCollaboratorCourses, setShowCollaboratorCourses] = React.useState(false);

  function renderCourses(coursesName : any) : any[] {
    const courses: any = [];
    for (let i = 0; i < coursesName.length; i++) {
      console.log("title:", coursesName[i].title);
      console.log("id:", coursesName[i]._id);
      courses.push(
          <List.Item
          key={i}
          title={coursesName[i].title}
          onPress={() => navigation.navigate(COURSE_MENU, {id: coursesName[i]._id})}
          />,
      );
    }
    return courses;
  }

  useFocusEffect(React.useCallback(() => {
    (async () => {
      const courses = await getMyCourses();
      setStudentCourses(courses.student);
      setCreatorCourses(courses.creator);
      setCollaboratorCourses(courses.collaborator);
    })();
  }, []))

  useEffect(() => {
    if (studentCourses.length > 0) {
      setShowStudentCourses(true);
    } else {
      setShowStudentCourses(false);
    }
  }, [studentCourses]);

  useEffect(() => {
    if (creatorCourses.length > 0) {
      setShowCreatorCourses(true);
    } else {
      setShowCreatorCourses(false);
    }
  }, [creatorCourses]);

  useEffect(() => {
    if (collaboratorCourses.length > 0) {
      setShowCollaboratorCourses(true);
    } else {
      setShowCollaboratorCourses(false);
    }
  }, [collaboratorCourses]);


  const coursesStudent = renderCourses(studentCourses);
  const courseProfessor = renderCourses(creatorCourses);
  const courseCollaborator = renderCourses(collaboratorCourses);

  return (
    <View>
      {(showStudentCourses ||
        showCreatorCourses ||
        showCollaboratorCourses) ? (

        <Subheading style={styles.profileSubtitle}>
          Courses
        </Subheading>
          
      ) : <></> }

      {showStudentCourses ? (
        <List.Accordion
          title="Student"
          left={(props) => <List.Icon {...props}
            icon={(props) => <List.Icon {...props} icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faUserGraduate } />
            )} />} />}>
          {coursesStudent}
        </List.Accordion>
      ) : <></> }

      {showCreatorCourses ? (
        <List.Accordion
          title="Teacher"
          left={(props) => <List.Icon {...props}
            icon={(props) => <List.Icon {...props} icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faChalkboardTeacher } />
            )} />} />}>
          {courseProfessor}
        </List.Accordion>
      ) : <></> }

      {showCollaboratorCourses ? (
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
