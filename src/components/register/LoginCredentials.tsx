import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Themes } from '../../styling/themes';
import sendLoginCredentials from '../../scripts/logIn';
import { PROFILE } from '../../routes';
import colors from '../../styling/colors';


const LoginCredentials = (props: any) => {
  const [username, setUsername] = React.useState({
    value: '',
    style: Themes.textInput,
  });
  const [password, setPassword] = React.useState({
    value: '',
    style: Themes.textInput,
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  function sendCredentials() {
    if (!username.value.trim()) {
      setUsername({...username, style:Themes.textInputWrong});
      setErrorMessage('Please enter your email');
      return;
    }
    if (!password.value.trim()) {
      setPassword({...password, style:Themes.textInputWrong});
      setErrorMessage('Please enter your password');
      return;
    }
    sendLoginCredentials(username.value, password.value)
      .then(() => {
        props.navigator.navigate(PROFILE);
      })
      .catch((errorMsg) => {
        setErrorMessage(errorMsg);
      });
  }

  return (
    <View style={props.style}>
      <TextInput
        label='Email'
        textContentType='emailAddress'
        value={username.value}
        onChangeText={(newUsername) => {
          setUsername({...username, value:newUsername, style:Themes.textInput});
        }}
        mode='outlined'
        style={{paddingBottom: hp(1)}}
        theme={username.style}
        disableFullscreenUI={true}
      />
      <TextInput
        label='Password'
        secureTextEntry={true}
        textContentType='password'
        theme={password.style}
        value={password.value}
        onChangeText={(newPassword) => {
          setPassword({...password, value:newPassword, style:Themes.textInput});
        }}
        mode='outlined'
        disableFullscreenUI={true}
      />
      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <Text style={{marginVertical: hp(2), color:colors.error}}>
          {errorMessage}
        </Text>
      </View>
      <Button 
        mode='contained' 
        style={{marginVertical: hp(1), marginHorizontal: wp(8)}}
        onPress={sendCredentials}>
          Log In
      </Button>
    </View>
  );
};

export default LoginCredentials;
