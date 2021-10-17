import * as React from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Credentials from './Credentials';

const Register = () => {
  return (
    <View>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../../assets/ubademy-logo.png')}/>
      </View>
      <Credentials style={{paddingTop: '15%'}}/>
      <Button mode='contained' style={{marginVertical: '10%', marginHorizontal: '20%'}}>
        Next
      </Button>
      <View style={{flexDirection: 'row'}}>
        <Text>Already have an account? </Text>
        <Text style={{color: '#3498db'}}>Log in</Text>
      </View>
    </View>
  );
};

export default Register;
