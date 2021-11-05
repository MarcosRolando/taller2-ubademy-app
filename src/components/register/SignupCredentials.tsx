import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Themes } from '../../styling/themes';
import { sendSignupCredentials } from '../../scripts/signUp';


const SignupCredentials = (props: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confPassword, setConfPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [emailInputStyle, setEmailInputStyle] = React.useState(Themes.textInput);
  const [passwordInputStyle, setPasswordInputStyle] = React.useState(Themes.textInput);
  const [confPasswordInputStyle, setConfPasswordInputStyle] = React.useState(Themes.textInput);
  const [usernameStyle, setUsernameStyle] = React.useState(Themes.textInput);
  const [errorMessage, setErrorMessage] = React.useState('');

  function sendCredentials(): boolean {
    if (!email.trim()) {
      setEmailInputStyle(Themes.textInputWrong);
      setErrorMessage('Please enter your email');
      return false;
    }
    if (!password.trim()) {
      setPasswordInputStyle(Themes.textInputWrong);
      setErrorMessage('Please enter a password');
      return false;
    }
    if (password != confPassword) {
      setConfPasswordInputStyle(Themes.textInputWrong);
      setErrorMessage('Passwords must match');
      return false;
    }
    if (!username.trim()) {
      setUsernameStyle(Themes.textInputWrong);
      setErrorMessage('Please enter a username');
      return false;
    }
    //TODO validar los credentials con el back
    sendSignupCredentials(email, password, username, setErrorMessage);
    props.navigation.navigate('Location');
    return true;
  }

  return (
    <View style={props.style}>
      <TextInput
        label='Email'
        textContentType='emailAddress'
        value={email}
        onChangeText={(email) => {
          setEmailInputStyle(Themes.textInput);
          setEmail(email);
        }}
        mode='outlined'
        theme={emailInputStyle}
        disableFullscreenUI={true}
      />
      <TextInput
        label='Password'
        style={{paddingTop:hp(1)}}
        secureTextEntry={true}
        textContentType='password'
        theme={passwordInputStyle}
        value={password}
        onChangeText={(password) => {
          setPasswordInputStyle(Themes.textInput);
          setPassword(password);
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <TextInput
        label='Confirm password'
        style={{paddingTop:hp(1)}}
        secureTextEntry={true}
        textContentType='newPassword'
        theme={confPasswordInputStyle}
        value={confPassword}
        onChangeText={(confPassword) => {
          setConfPasswordInputStyle(Themes.textInput);
          setConfPassword(confPassword);
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <TextInput
        label='Username'
        style={{paddingTop:hp(1)}}
        secureTextEntry={true}
        textContentType='username'
        theme={usernameStyle}
        value={username}
        onChangeText={(username) => {
          setUsernameStyle(Themes.textInput);
          setUsername(username);
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

export default SignupCredentials;
