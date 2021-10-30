import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import UbademyTheme from '../UbademyTheme'


const Credentials = (props: any) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [usernameInputStyle, setUsernameInputStyle] = React.useState(themes.textInput);
  const [passwordInputStyle, setPasswordInputStyle] = React.useState(themes.textInput);
  const [errorMessage, setErrorMessage] = React.useState('');

  function sendCredentials(): boolean {
    if (!username.trim()) {
      setUsernameInputStyle(themes.wrongTextInput);
      setErrorMessage('Please write your email');
      return false;
    }
    if (!password.trim()) {
      setPasswordInputStyle(themes.wrongTextInput);
      setErrorMessage('Please write your password');
      return false;
    }
    return true;
  }

  return (
    <View style={props.style}>
      <TextInput
        label='Email'
        textContentType="emailAddress"
        value={username}
        onChangeText={(username) => {
          setUsernameInputStyle(themes.textInput);
          setUsername(username);
        }}
        mode='outlined'
        style={{paddingBottom: hp(1)}}
        theme={usernameInputStyle}
        disableFullscreenUI={true}
      />
      <TextInput
        label='Password'
        secureTextEntry={true}
        textContentType="newPassword"
        theme={passwordInputStyle}
        value={password}
        onChangeText={(password) => {
          setPasswordInputStyle(themes.textInput);
          setPassword(password);
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <Text style={{marginVertical: hp(2), color:'#CF6679'}}>
          {errorMessage}
        </Text>
      </View>
      <Button 
        mode='contained' 
        style={{marginVertical: hp(1), marginHorizontal: wp(8)}}
        onPress={sendCredentials}>
          Next
      </Button>
    </View>
  );
};

export default Credentials;

const themes = {
  textInput: {
    ...UbademyTheme,
  },
  wrongTextInput: {
    ...UbademyTheme,
    colors: {
      ...UbademyTheme.colors,
      primary: '#CF6679',
      placeholder: '#CF6679',
    }
  },
};
