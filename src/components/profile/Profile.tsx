import React, {useEffect} from 'react';
import { View} from 'react-native';
import { Button } from 'react-native-paper';
import getCoursesData from '../../scripts/profile';
import BasicInfo from './BasicInfo';
import Courses from './Courses';
import Intro from './Intro';
import { heightPercentageToDP as hp,
 widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PROFILE_EDITOR } from '../../routes';


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
      {(props.ownProfile !== undefined) ? 
        <Button 
          mode='contained'
          style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
          onPress={() => props.navigation.navigate(PROFILE_EDITOR)}>
          Edit profile
        </Button>
        :
        <></>
      }
    </View>
  );
};

export default Profile;
