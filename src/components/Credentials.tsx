import * as React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';


const Credentials = (props: any) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={props.style}>
      <TextInput
        label='Email'
        value={username}
        onChangeText={(username) => setUsername(username)}
        mode='outlined'
        style={{paddingBottom: '2%'}}
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

export default Credentials;
