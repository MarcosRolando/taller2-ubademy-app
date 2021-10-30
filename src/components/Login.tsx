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
    const [showInputError, setShowInputError] = React.useState("");

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

    function resolveLoginCredentials(data : any) {
        // Modificar cuando el backend me diga sus mensajitos
        if (data.error) {
            console.log("ocurrió un error :(");
        } else if (data.token) {
            console.log("se entró <3");
        }
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

            <Text style = {styles.textInputWrong}>
                {showInputError}
            </Text>

            <Button mode='contained' style={styles.button}
                onPress={() => {
                    if (checkInput()) {
                        setShowInputError("");
                        setUsernameInputTheme(themes.textInput);
                        setPasswordInputTheme(themes.textInput);
                        sendLoginCredentials(username, password)
                        .then(response => response.json())
                        .then(data => resolveLoginCredentials(data));
                        
                    } else {
                        setShowInputError("Please, complete the fields");
                    }
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
        borderColor: '#CF6679',
        color: '#CF6679'
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
            primary: '#CF6679',
            placeholder: '#CF6679',
            border: '#CF6679'
        },
        
    }
}