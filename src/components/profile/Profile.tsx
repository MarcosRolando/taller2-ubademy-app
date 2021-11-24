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
import { useFocusEffect } from '@react-navigation/core';


const Profile = (props: any) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [subType, setSubType] = React.useState('');
  const [likedCourses, setLikedCourses] = React.useState([] as Array<string>);
  const [image, setImage] = React.useState('');


  const [coursesData, setCoursesData] = React.useState({
    courseStudent: [] as any,
    courseProfessor: [] as any,
    courseCollaborator: [] as any,
  });

  useFocusEffect(React.useCallback(() => {
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
      .then(({_name, _email, _location, _subType, _image, _genres}) => {
        setName(_name);
        setEmail(_email);
        setLocation(_location);
        setSubType(_subType);
        setImage(_image);
        setLikedCourses(_genres); // TODO mostrarlos aca tambien
      });
  }, []));

  const editProfile = () => {
    props.navigation.navigate(PROFILE_EDITOR, { name, location, likedCourses, image })
  }

  return (
    <View style={props.style}>
      <Intro username={name} image={image} />
      {(props.ownProfile !== undefined) ? 
        <BasicInfo email={email} location={location} subType={subType} />
        :
        <></>
      }
      <Courses coursesData={coursesData} />
      {(props.ownProfile !== undefined) ? 
        <Button 
          mode='contained'
          style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
          onPress={editProfile}>
          Edit profile
        </Button>
        :
        <></>
      }
    </View>
  );
};

export default Profile;
