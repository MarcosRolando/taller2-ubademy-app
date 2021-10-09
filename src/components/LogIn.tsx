import React, { useRef, useState } from 'react';
import {TextInput, Button, View, StyleSheet } from 'react-native';
import sendLoginCredentials from '../scripts/logIn';

const LogIn = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameInputStyle, setUsernameInputStyle] = useState(styles.textInput);
    const [passwordInputStyle, setPasswordInputStyle] = useState(styles.textInput);

    function checkInput(): boolean {
        if (!username.trim()) {
            setUsernameInputStyle(styles.wrongTextInput);
            return false;
        }
        if (!password.trim()) {
            setPasswordInputStyle(styles.wrongTextInput);
            return false;
        }
        return true;
    }

    return (
        <View>
            <TextInput
                autoFocus={true}
                style={usernameInputStyle}
                placeholder="Enter your mail"
                onChangeText={username => {
                    setUsernameInputStyle(styles.textInput); 
                    setUsername(username);
                }}
            />
            <TextInput
                style={passwordInputStyle}
                placeholder="Enter your password"
                onChangeText={password => {
                    setPasswordInputStyle(styles.textInput); 
                    setPassword(password);
                }}
            />
            <Button
                onPress={() => {
                    if (checkInput()) {
                        sendLoginCredentials(username, password);
                    }
                }}
                title={"Login"}
            />
        </View>
    )
}

export default LogIn;

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: "black",
    },
    wrongTextInput: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        borderColor: "red",
    }
});
