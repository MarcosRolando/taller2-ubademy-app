import * as React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';


const Credentials = (props: any) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={props.style}>
      <TextInput
        label='Email'
        textContentType='emailAddress'
        value={username}
        onChangeText={(username) => setUsername(username)}
        mode='outlined'
        style={{paddingBottom: hp(1)}}
        disableFullscreenUI={true}
      />
      <TextInput
        label='Password'
        textContentType='password'
        value={password}
        onChangeText={(password) => setPassword(password)}
        mode='outlined'
        disableFullscreenUI={true}
      />
    </View>
  );
};

export default Credentials;
