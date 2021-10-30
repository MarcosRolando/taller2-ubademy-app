import * as React from 'react';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {View, Image} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Credentials from './Credentials';

const Register = (props: any) => {
  const [screen, setScreen] = React.useState(credentialScreen());

  function credentialScreen() {
    return (
      <View style={props.style}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../../assets/ubademy-logo.png')}/>
        </View>
        <Credentials style={{paddingTop: hp(4)}}/>
        <View style={{paddingTop: hp(2), flexDirection: 'row', justifyContent:'center'}}>
          <Text>Already have an account? </Text>
          <Text style={{color: '#3498db'}}>Log in</Text>
        </View>
      </View>
    );
  }

  return screen;
};

export default Register;
