import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import {
    Button,
    DarkTheme as PaperDarkTheme,
    Text,
    TextInput
} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import sendLoginCredentials from '../scripts/logIn';


const screen = Dimensions.get('window');

const Login = (props: any) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameInputTheme, setUsernameInputTheme] = React.useState(themes.textInput);
    const [passwordInputTheme, setPasswordInputTheme] = React.useState(themes.textInput);
    const [showInputError, setShowInputError] = React.useState(false);

    function checkInput(): boolean {
        var r = true;
        if (!username.trim()) {
            setUsernameInputTheme(themes.textInputWrong);
            r = false;
        }
        if (!password.trim()) {
            setPasswordInputTheme(themes.textInputWrong);
            r = false;
        }
        return r;
    }


    return (
        <View style={styles.container}>
            <View style={{alignSelf: 'center'}}>
                <Image source={require('../../assets/ubademy-logo.png')}/>
            </View>

            <TextInput
                label='Email'
                textContentType="emailAddress"
                value={username}
                onChangeText={(username) => setUsername(username)}
                mode='outlined'
                disableFullscreenUI={true}
                theme={usernameInputTheme}
            />

            <TextInput
                label='Password'
                secureTextEntry={true}
                textContentType="newPassword"
                value={password}
                onChangeText={(password) => setPassword(password)}
                mode='outlined'
                disableFullscreenUI={false}
                theme={passwordInputTheme}
            />

            {
                showInputError ? (
                    <Text style = {styles.textInputWrong}>
                        Please, complete the fields in red
                    </Text>
                ) : null
            }

            <Button mode='contained' style={styles.button}
                onPress={() => {
                    if (checkInput()) {
                        setShowInputError(false);
                        setUsernameInputTheme(themes.textInput);
                        setPasswordInputTheme(themes.textInput);
                        //sendLoginCredentials(username, password);
                    } else {
                        setShowInputError(true);
                    }
                    //sendLoginCredentials(username, password);
                    //setUsernameInputTheme(themes.textInputWrong);
                    //setShowErrorText(true);
                    //console.log("se presiono!");
                }}
                >
                    Login
            </Button>
        </View>
    );
    
};

export default Login;

const styles = StyleSheet.create({
    textInput: {
        paddingBottom: hp(1),
    },
    button: {
        marginVertical: hp(1),
        marginHorizontal: wp(8)
    },
    container: {
        flex: 1,
        backgroundColor: '#111',
        paddingTop: hp(15),
        paddingHorizontal: wp(15)
      },
    textInputWrong: {
        paddingBottom: hp(1),
        borderColor: '#B00020',
        color: '#B00020'
    }
});

const themes = {
    textInput: {
        ...PaperDarkTheme,
        colors: {
        ...PaperDarkTheme.colors,
        primary: '#3498db',
        },
    },
    textInputWrong: {
        ...PaperDarkTheme,
        colors: {
        ...PaperDarkTheme.colors,
        primary: '#B00020',
        placeholder: '#B00020',
        border: '#B00020',
        colorOnSurface: '#B00020'
        },
        
    }
}