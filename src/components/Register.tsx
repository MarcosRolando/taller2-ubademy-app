import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <View style={{marginBottom: 10}}>
        <TextInput
          label='Email'
          value={username}
          onChangeText={username => setUsername(username)}
          mode='outlined'
        />
      </View>
      <View>
        <TextInput
          label='Password'
          value={password}
          onChangeText={password => setPassword(password)}
          mode='outlined'
        />
      </View>
    </View>
  );
};

export default Register;
