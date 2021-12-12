import React from 'react';
import { View} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { getMyCourses, getPassedCourses, getProfileInfo } from '../../scripts/profile';
import BasicInfo from './BasicInfo';
import Courses from './Courses';
import Intro from './Intro';
import { heightPercentageToDP as hp,
 widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CHAT, PROFILE_EDITOR } from '../../routes';
import { useFocusEffect } from '@react-navigation/core';
import Fire from '../../../Fire';
import { getUserCredentials } from '../../userCredentials';
import Badges from './Badges';


const Profile = ({ profileInfo, navigation, style, ownProfile }: any) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [subType, setSubType] = React.useState('');
  const [likedCourses, setLikedCourses] = React.useState([] as Array<string>);
  const [image, setImage] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);


  const [courses, setCourses] = React.useState({
    student: [] as Array<any>,
    creator: [] as Array<any>,
    collaborator: [] as Array<any>,
  });

  useFocusEffect(React.useCallback(() => { 
    (async () => {
      try {
        const _courses = await getMyCourses();
        const passedCourses = await getPassedCourses();
        setCourses(_courses);
        if (ownProfile !== undefined) {
          const {_name, _email, _location, _subType, _image, _genres} = await getProfileInfo(getUserCredentials().email);
          setName(_name);
          setEmail(_email);
          setLocation(_location);
          setSubType(_subType);
          setImage(_image);
          setLikedCourses(_genres); // TODO mostrarlos aca tambien
        } else {
          setName(profileInfo.name); // TODO estoy casi seguro que estoy mandando cosas que no recibo aca
          setEmail(profileInfo.email);
          setLocation(profileInfo.location);
          setSubType(profileInfo.subType);
          setImage(profileInfo.image);
          setLikedCourses(profileInfo.genres); // TODO mostrarlos aca tambien
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []));

  const editProfile = () => {
    navigation.navigate(PROFILE_EDITOR, { name, location, likedCourses, image })
  }

  const sendMessage = async () => {
    const chatId = await Fire.getOrCreateChat(profileInfo.email, profileInfo.image);
    navigation.navigate(CHAT, { chatId: chatId, otherUserEmail: profileInfo.email });
  }

  if (loading) {
    return (
      <View style={{marginTop: hp(5)}}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={style}>
      <Intro username={name} image={image} />
      {(ownProfile !== undefined) ? 
        <BasicInfo email={email} location={location} subType={subType} />
        :
        <></>
      }
      <Badges />
      <Courses navigation={navigation} courses={courses} />
      {(ownProfile !== undefined) ? 
        <Button
          mode='contained'
          style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
          onPress={editProfile}>
          Edit profile
        </Button>
        :
        <Button
          mode='contained'
          style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
          onPress={sendMessage}>
          Send message
        </Button>
      }
    </View>
  );
};

export default Profile;
