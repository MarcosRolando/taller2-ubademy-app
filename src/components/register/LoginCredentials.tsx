import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text, IconButton} from 'react-native-paper';
import { heightPercentageToDP as hp, 
  widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Themes } from '../../styles/themes';
import sendLoginCredentials from '../../scripts/logIn';
import { ROOT } from '../../routes';
import colors from '../../styles/colors';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { setAccessToken } from '../../apiWrapper';
import { setUserCredentials } from '../../userCredentials';


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
  const [registerFingerprint, setRegisterFingerprint] = React.useState(false);

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
    sendLoginCredentials(username.value, password.value, registerFingerprint)
      .then(() => {
        setErrorMessage('');
        props.navigation.navigate(ROOT);
      },
      (errorMsg: Error) => {
        setErrorMessage(errorMsg.message);
      });
  }

  async function fingerprintLogin() {
    try {
      const response = await LocalAuthentication.authenticateAsync();
      if (!response.success) return;
      const jwt = await SecureStore.getItemAsync('ubademy-biometric-jwt');
      if (jwt !== null) {
        setAccessToken(jwt);
        setUserCredentials(String(await SecureStore.getItemAsync('ubademy-email')), '');
        setErrorMessage('');
        props.navigation.navigate(ROOT);
        return;
      }
      setErrorMessage('Login with your credentials to setup the fingerprint login');
      setRegisterFingerprint(true);
    } catch(error) {
      console.log(error);
    }
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
        style={{marginTop: hp(1), marginHorizontal: wp(8)}}
        onPress={sendCredentials}>
          Login
      </Button>
      <IconButton
        icon='fingerprint'
        color={colors.primary}
        size={wp(10)}
        style={{position: 'absolute', bottom: hp(-1.2), left: wp(62), margin: 0}}
        onPress={fingerprintLogin}>
      </IconButton>
    </View>
  );
};

export default LoginCredentials;
