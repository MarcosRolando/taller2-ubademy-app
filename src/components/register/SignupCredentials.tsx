import React, { useEffect } from 'react';
import {Platform, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Themes } from '../../styles/themes';
import { sendSignupCredentials } from '../../scripts/signUp';
import colors from '../../styles/colors';
import { PROFILE_SETUP } from '../../routes';

const characters = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


function validateEmail(email: string) {
  return email
    .toLowerCase()
    .match(
      characters
    );
}


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
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
    if (password.value.length < 6) {
      setErrorMessage('The password must be at least 6 characters');
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
    if (!validateEmail(email.value)) {
      setEmail({
        ...email,
        theme: Themes.textInputWrong,
      })
      setErrorMessage('Please enter a valid email');
      return;
    }
    setLoading(true);
    sendSignupCredentials(email.value, password.value)
      .then(() => {
        props.navigation.navigate(PROFILE_SETUP)
      },
      (errorMsg: Error) => {
        setErrorMessage(errorMsg.message);
      })
      .finally(() => setLoading(false));
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
      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <Text style={{marginVertical: hp(2), color: colors.error}}>
          {errorMessage}
        </Text>
      </View>
      <Button
        loading={loading}
        disabled={loading}
        mode='contained'
        style={{marginVertical: hp(1), marginHorizontal: wp(8)}}
        onPress={sendCredentials}>
          Next
      </Button>
    </View>
  );
};

export default SignupCredentials;
