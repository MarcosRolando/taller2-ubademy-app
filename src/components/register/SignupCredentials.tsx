import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Themes } from '../../styling/themes';
import { sendSignupCredentials } from '../../scripts/signUp';
import colors from '../../styling/colors';
import { LOCATION } from '../../routes';


const SignupCredentials = (props: any) => {
  const [email, setEmail] = React.useState({
    value: '',
    theme: Themes.textInput,
  });
  const [password, setPassword] = React.useState({
    value: '',
    theme: Themes.textInput,
  });
  const [confPassword, setConfPassword] = React.useState({
    value: '',
    theme: Themes.textInput,
  });
  const [username, setUsername] = React.useState({
    value: '',
    theme: Themes.textInput,
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  function sendCredentials() {
    if (!email.value.trim()) {
      setEmail({
        ...email,
        theme: Themes.textInputWrong,
      })
      setErrorMessage('Please enter your email');
      return;
    }
    if (!password.value.trim()) {
      setPassword({
        ...password,
        theme: Themes.textInputWrong,
      })
      setErrorMessage('Please enter a password');
      return;
    }
    if (password.value != confPassword.value) {
      setConfPassword({
        ...confPassword,
        theme: Themes.textInputWrong,
      })
      setErrorMessage('Passwords must match');
      return;
    }
    if (!username.value.trim()) {
      setUsername({
        ...username,
        theme: Themes.textInputWrong,
      })
      setErrorMessage('Please enter a username');
      return;
    }
    sendSignupCredentials(email.value, password.value, username.value)
      .then(() => {
        props.navigation.navigate(LOCATION)
      },
      (errorMsg) => {
        setErrorMessage(errorMsg);
      });
  }

  return (
    <View style={props.style}>
      <TextInput
        label='Email'
        textContentType='emailAddress'
        value={email.value}
        onChangeText={(newEmail) => {
          setEmail({...email, value:newEmail, theme:Themes.textInput});
        }}
        mode='outlined'
        theme={email.theme}
        disableFullscreenUI={true}
      />
      <TextInput
        label='Password'
        style={{paddingTop:hp(1)}}
        secureTextEntry={true}
        textContentType='password'
        theme={password.theme}
        value={password.value}
        onChangeText={(newPassword) => {
          setPassword({...password, value:newPassword, theme:Themes.textInput});
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <TextInput
        label='Confirm password'
        style={{paddingTop:hp(1)}}
        secureTextEntry={true}
        textContentType='newPassword'
        theme={confPassword.theme}
        value={confPassword.value}
        onChangeText={(newConfPassword) => {
          setConfPassword({...confPassword, value:newConfPassword, theme:Themes.textInput});
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <TextInput
        label='Username'
        style={{paddingTop:hp(1)}}
        textContentType='username'
        theme={username.theme}
        value={username.value}
        onChangeText={(newUsername) => {
          setUsername({...username, value:newUsername, theme:Themes.textInput});
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <Text style={{marginVertical: hp(2), color: colors.error}}>
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
