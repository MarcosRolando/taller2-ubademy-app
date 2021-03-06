import React from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, Button, Paragraph, Subheading } from 'react-native-paper';
import { getMyCourses, getPassedCourses, getProfileInfo } from '../../scripts/profile';
import BasicInfo from './BasicInfo';
import Courses from './Courses';
import Intro from './Intro';
import { heightPercentageToDP as hp,
 widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CHAT, PROFILE_EDITOR, SUB_CHANGE } from '../../routes';
import { useFocusEffect } from '@react-navigation/core';
import Fire from '../../../Fire';
import { getUserCredentials } from '../../userCredentials';
import Badges from './Badges';
import Tags from '../course/menu/Tags';
import styles from '../../styles/styles';
import colors from '../../styles/colors';


const Profile = ({ profileInfo, navigation, style, ownProfile }: any) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [subType, setSubType] = React.useState('');
  const [likedCourses, setLikedCourses] = React.useState([] as Array<string>);
  const [image, setImage] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [passedCourses, setPassedCourses] =
    React.useState([] as Array<{creator_email: string, title: string}>)
  const [balance, setBalance] = React.useState(0);
  const [wallet, SetWallet] = React.useState({
    address: "",
    balance: ""
  });

  const [courses, setCourses] = React.useState({
    student: [] as Array<any>,
    creator: [] as Array<any>,
    collaborator: [] as Array<any>,
  });

  useFocusEffect(React.useCallback(() => { 
    (async () => {
      try {
        if (ownProfile !== undefined) {
          const {_name, _email, _location, _subType, _image, _genres, _wallet_data} = await getProfileInfo(getUserCredentials().email);
          setName(_name);
          setEmail(_email);
          setLocation(_location);
          setSubType(_subType);
          setImage(_image);
          setLikedCourses(_genres);

          const _courses = await getMyCourses();
          const _passedCourses = await getPassedCourses();
          setCourses(_courses);
          setPassedCourses(_passedCourses);
          setBalance(_wallet_data.balance);
          SetWallet(_wallet_data);
        } else {
          setName(profileInfo.name); // TODO estoy casi seguro que estoy mandando cosas que no recibo aca
          setEmail(profileInfo.email);
          setLocation(profileInfo.location);
          setSubType(profileInfo.subType);
          setImage(profileInfo.image);
          setLikedCourses(profileInfo.genres);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []));

  const editProfile = () => {
    navigation.navigate(PROFILE_EDITOR, { name, location, likedCourses, image });
  }

  function changeSubscription() {
    navigation.navigate(SUB_CHANGE, {subscription: subType});
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

      <BasicInfo email={email} location={location} subType={subType} />

      <Badges passedCourses={passedCourses} />

      {ownProfile !== undefined ? (
        <View>
          <Subheading style={{...styles.profileSubtitle, marginBottom:hp(3)}}>
            Wallet
          </Subheading>

          <View style={{...styles.payment, alignSelf:"center"}}>
            <Paragraph style={styles.paymentText}>
              {wallet.balance} ETH
            </Paragraph>
          </View>

          <View style={{...styles.payment, alignSelf:"center", height: hp(10)}}>
            <Paragraph style={{...styles.paymentText, marginHorizontal: wp(2)}}>
              {wallet.address}
            </Paragraph>
          </View>

        </View>

      ) : <></>}

      <Subheading style={{...styles.profileSubtitle, marginBottom:hp(2), paddingTop:hp(2)}}>
        Interests
      </Subheading>

      {likedCourses.length > 0 ? (
        <Tags hashtags={likedCourses} />
      ) : (
        <Text style={{color: colors.primary, textAlign: "center", marginBottom: hp(3)}}>
          This user has no interests yet!
        </Text>
      )}


      <Courses navigation={navigation} courses={courses} />

      {(ownProfile !== undefined) ? 
      <View>
          <Button
            mode='contained'
            style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
            onPress={editProfile}
          >
            Edit profile
          </Button>

          <Button
            mode='contained'
            style={{marginVertical: hp(2), marginHorizontal: wp(8)}}
            onPress={changeSubscription}
          >
            Change subscription
          </Button>
        </View>
        :
        <Button
          mode='contained'
          style={{marginVertical: hp(5), marginHorizontal: wp(8)}}
          onPress={sendMessage}>
          Send message
        </Button>
      }

    </View>
  );
};

export default Profile;
