import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TextInput} from 'react-native-paper';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <View style={{alignSelf:'center'}}>
        <Image source={require('../../assets/ubademy-logo.png')}/>
      </View>
      <TextInput
        label='Email'
        value={username}
        onChangeText={(username) => setUsername(username)}
        mode='outlined'
        style={{paddingTop:'15%', paddingBottom:'3%'}}
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
