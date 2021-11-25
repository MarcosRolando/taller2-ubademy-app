import React, {useEffect} from 'react';
import { View} from 'react-native';
import { Button } from 'react-native-paper';
import { getCoursesData, getProfileInfo } from '../../scripts/profile';
import BasicInfo from './BasicInfo';
import Courses from './Courses';
import Intro from './Intro';
import { heightPercentageToDP as hp,
 widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PROFILE_EDITOR } from '../../routes';
import { getUserCredentials } from '../../userCredentials';


const Profile = (props: any) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [subType, setSubType] = React.useState('');


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
      });
    const userEmail = (props.email !== undefined) ? props.email : getUserCredentials().email;
    getProfileInfo(userEmail)
      .then(({_name, _email, _location, _subType, _genres}) => {
        setName(_name);
        setEmail(_email);
        setLocation(_location);
        setSubType(_subType);
      });
  }, []);

  return (
    <View style={props.style}>
      <Intro username={name}/>
      {(props.ownProfile !== undefined) ? 
        <BasicInfo email={email} location={location} subType={subType} />
        :
        <></>
      }
      <Courses navigation={props.navigation} coursesData={coursesData} />
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
