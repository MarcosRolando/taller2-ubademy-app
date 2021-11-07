import * as React from 'react';
import {heightPercentageToDP as hp,
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import SignupCredentials from './SignupCredentials';
import colors from '../../styling/colors';

const Signup = (props: any) => {
  return (
    <View style={props.style}>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../../../assets/ubademy-logo.png')}/>
      </View>
      <SignupCredentials navigation={props.navigation} style={{paddingTop: hp(4)}}/>
      <View style={{paddingTop: hp(2), flexDirection: 'row', justifyContent:'center'}}>
        <Text>Already have an account? </Text>
        <Text 
        style={{color: colors.primary}} 
        onPress={() => props.navigation.push('Login')}>
        Log in
        </Text>
      </View>
    </View>
  );
};

export default Signup;
