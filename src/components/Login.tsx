import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import {
    Button,
    Dialog,
    Portal,
    Text,
    TextInput
} from 'react-native-paper';
import sendLoginCredentials from '../scripts/logIn';
import themes from '../constants/themes';
import styles from '../constants/styles';

const Login = (props: any) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameInputTheme, setUsernameInputTheme] = React.useState(themes.textInput);
    const [passwordInputTheme, setPasswordInputTheme] = React.useState(themes.textInput);
    const [showInputError, setShowInputError] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

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
            showDialog();
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

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>An error has occurred</Dialog.Title>
                        <Dialog.Content>
                            <Text>This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>OK</Button>
                        </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
    
};

export default Login;
