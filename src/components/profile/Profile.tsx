import React, {useEffect} from 'react';
import { View} from 'react-native';
import getCoursesData from '../../scripts/profile';
import BasicInfo from './BasicInfo';
import Courses from './Courses';
import Intro from './Intro';


const Profile = (props: any) => {
  const [coursesData, setCoursesData] = React.useState({
    courseStudent: [] as any,
    courseProfessor: [] as any,
    courseCollaborator: [] as any,
  });

  useEffect(() => {
    getCoursesData()
      .then((data) => {
        setCoursesData({
          courseStudent: [...data],
          courseProfessor: [...data],
          courseCollaborator: [...data],
        });
      })
  }, []);

  return (
    <View style={props.style}>
      <Intro username={'John Doe'}/>
      {(props.ownProfile !== undefined) ? 
        <BasicInfo email={'some_email@gmail.com'} location={'Argentina'} />
        :
        <></>
      }
      <Courses coursesData={coursesData} />
    </View>
  );
};

export default Profile;
