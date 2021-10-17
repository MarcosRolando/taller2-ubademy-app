import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Image source={require('../../assets/ubademy-logo.png')} style={{marginLeft: wp(20), marginBottom: hp(3)}}/>
      <TextInput
        label='Email'
        value={username}
        onChangeText={(username) => setUsername(username)}
        mode='outlined'
        style={{marginBottom: hp(1.5)}}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={(password) => setPassword(password)}
        mode='outlined'
      />
    </View>
  );
};

export default Register;
