import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DropDown from 'react-native-paper-dropdown';
import { Text, Button, TextInput } from 'react-native-paper';
import { EXPLORE } from '../../routes';
import { getSignupData, sendSignupProfile } from '../../scripts/signUp';
import colors from '../../styles/colors';
import { Themes } from '../../styles/themes';

const ProfileSetup = (props: any) => {
    const [username, setUsername] = React.useState({
      value: '',
      theme: Themes.textInput,
    });
    const [showLocations, setShowLocations] = React.useState(false);
    const [location, setLocation] = React.useState('');
    const [locationList, setLocationList] = React.useState([] as Array<{label:string, value:string}>);
    const [showCourses, setShowCourses] = React.useState(false);
    const [courses, setCourses] = React.useState('');
    const [coursesList, setCoursesList] = React.useState([] as Array<{label:string, value:string}>);
    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
      getSignupData()
        .then(({locations, courses}) => {
          let nLocations = locations.map((location) => {
            return {label:location, value:location};
          })
          setLocationList(nLocations);
          let nCourses = courses.map((course) => {
            return {label:course, value:course};
          })
          setCoursesList(nCourses);
        },
        (errorMsg: Error) => {
          setErrorMessage(errorMsg.message);
        });
    }, []); // The empty list avoids this function being run every time the user opens or closes the list of locations

    function sendData() {
      if (!username.value.trim()) {
        setUsername({
          ...username,
          theme: Themes.textInputWrong,
        })
        setErrorMessage('Please enter a username');
        return;
      }
      if (location === '') {
        setErrorMessage('Please choose a location');
        return;
      }
      let coursesToSend = courses.split(',').filter((course) => (course !== ''));
      sendSignupProfile(username.value, location, coursesToSend)
        .then(() => {
          props.navigation.navigate(EXPLORE);
        },
        (errorMsg: Error) => {
          setErrorMessage(errorMsg.message);
        });
    }

    return (
      <View style={props.style}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../../assets/ubademy-logo.png')}/>
        </View>
        <TextInput
          label='Username'
          style={{marginTop:hp(4), marginBottom:hp(1)}}
          textContentType='username'
          theme={username.theme}
          value={username.value}
          onChangeText={(newUsername: string) => {
            setUsername({...username, value:newUsername, theme:Themes.textInput});
          }}
          mode='outlined'
          disableFullscreenUI={true}
        />
        <DropDown
          label={"Where are you from?"}
          mode={"outlined"}
          visible={showLocations}
          showDropDown={() => setShowLocations(true)}
          onDismiss={() => setShowLocations(false)}
          value={location}
          setValue={setLocation}
          list={locationList}
          dropDownStyle={{paddingTop:hp(1)}}
        />
        <View style={{marginVertical: hp(1)}} />
        <DropDown
          label={"What are you interested in?"}
          mode={"outlined"}
          visible={showCourses}
          showDropDown={() => setShowCourses(true)}
          onDismiss={() => setShowCourses(false)}
          value={courses}
          setValue={setCourses}
          list={coursesList}
          dropDownStyle={{paddingTop:hp(1)}}
          multiSelect
        />
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <Text style={{marginVertical: hp(1), color: colors.error}}>
            {errorMessage}
          </Text>
        </View>
        <Button 
          mode='contained'
          style={{marginVertical: hp(1), marginHorizontal: wp(8)}}
          onPress={sendData}>
            Next
        </Button>
      </View>
    );
  };
  
export default ProfileSetup;
