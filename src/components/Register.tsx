import * as React from 'react';
import {View, Image} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';

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
        style={{paddingTop:'15%', paddingBottom:'2%'}}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={(password) => setPassword(password)}
        mode='outlined'
      />
      <Button mode='contained' style={{marginVertical:'10%', marginHorizontal:'20%'}}>
        Next
      </Button>
      <View style={{flexDirection:'row'}}>
        <Text>Already have an account? </Text>
        <Text style={{color:'#3498db'}}>Log in</Text>
      </View>
    </View>
  );
};

export default Register;
