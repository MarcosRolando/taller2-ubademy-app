import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DropDown from 'react-native-paper-dropdown';
import { Button, Text } from 'react-native-paper';
import { getSignupCourses, sendSignupCourses } from '../../scripts/signUp';
import colors from '../../styling/colors';
import { PROFILE } from '../../routes';

const Courses = (props: any) => {
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
    const [courses, setCourses] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [coursesList, setCoursesList] = React.useState([] as Array<{label:string, value:string}>);

    useEffect(() => {
      getSignupCourses()
        .then((courses) => {
          let nCourses = courses.map((course) => {
            return {label:course, value:course};
          })
          setCoursesList(nCourses);
        },
        (errorMsg: Error) => {
          setErrorMessage(errorMsg.message);
        })
    }, []); // The empty list avoids this function being run every time the user opens or closes the list of locations

    function sendCourses() {
      let coursesToSend = courses.split(',').filter((course) => (course !== ''));
      sendSignupCourses(coursesToSend)
        .then(() => {
          props.navigation.navigate(PROFILE);
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
        <View style={{paddingTop:hp(4), paddingBottom:hp(1.2)}}>
          <DropDown
            label={"What are you interested in?"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={courses}
            setValue={setCourses}
            list={coursesList}
            dropDownStyle={{paddingTop:hp(1)}}
            multiSelect
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <Text style={{marginVertical: hp(1), color: colors.error}}>
            {errorMessage}
          </Text>
        </View>
        <Button 
          mode='contained'
          onPress={sendCourses}
          style={{marginVertical: hp(1), marginHorizontal: wp(8)}}>
            Next
        </Button>
      </View>
    );
  };
  
export default Courses;
