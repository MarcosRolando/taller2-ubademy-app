import React from 'react';
import { Image, View } from 'react-native';
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DropDown from 'react-native-paper-dropdown';
import { Text, Button } from 'react-native-paper';
import { REGISTER_COURSES } from '../../routes';
import { sendSignupLocation } from '../../scripts/signUp';
import colors from '../../styling/colors';

const Location = (props: any) => {
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
    const [location, setLocation] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const locationList = [
      {
        label: "Argentina",
        value: "argentina",
      },
      {
        label: "Germany",
        value: "germany",
      },
      {
        label: "Peru",
        value: "peru",
      },
      {
        label: "Africa",
        value: "africa",
      },
      {
        label: "China",
        value: "china",
      },
    ];

    function sendLocation() {
      sendSignupLocation(location)
        .then(() => {
          props.navigation.navigate(REGISTER_COURSES);
        },
        (errorMsg) => {
          setErrorMessage(errorMsg);
        })
    }

    return (
      <View style={props.style}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../../assets/ubademy-logo.png')}/>
        </View>
        <View style={{paddingTop:hp(4), paddingBottom:hp(1.2)}}>
          <DropDown
            label={"Where are you from?"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={location}
            setValue={setLocation}
            list={locationList}
            dropDownStyle={{paddingTop:hp(1)}}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <Text style={{marginVertical: hp(1), color: colors.error}}>
            {errorMessage}
          </Text>
        </View>
        <Button 
          mode='contained'
          style={{marginVertical: hp(1), marginHorizontal: wp(8)}}
          onPress={sendLocation}>
            Next
        </Button>
        <Text 
        style={{marginTop:hp(2), 
                lineHeight:hp(3), 
                paddingHorizontal:wp(2), 
                backgroundColor:'#4444',
                borderRadius:6}}>
          Don't worry, we will only use this information to recommend you courses :-)
        </Text>
      </View>
    );
  };
  
export default Location;
