import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SIGNUP } from '../../routes';
import colors from '../../styles/colors';
import LoginCredentials from './LoginCredentials';

const Login = (props: any) => {
    return (
      <View style={props.style}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../../assets/ubademy-logo.png')}/>
        </View>
        <LoginCredentials navigation={props.navigation} style={{paddingTop: hp(4)}}/>
        <View style={{paddingTop: hp(2), flexDirection: 'row', justifyContent:'center'}}>
          <Text>Don't have an account? </Text>
          <Text 
          style={{color: colors.primary}} 
          onPress={() => props.navigation.navigate(SIGNUP)}>
          Sign up
          </Text>
        </View>
      </View>
    );
  };
  
export default Login;
