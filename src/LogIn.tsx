import React, { useState } from 'react';
import {TextInput, Button, View, StyleSheet, TextInputBase } from 'react-native';
import foo from './foo';

const styles = StyleSheet.create({
    textInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
});

const LogIn = (props: any) => {
    const [username, setUsername] = useState((props.withUsername != undefined) ? props.withUsername : "");
    const [password, setPassword] = useState("");

    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your mail"
                onChangeText={username => setUsername(username)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                onChangeText={password => setPassword(password)}
            />
            <Button
                onPress={() => foo()}
                title={"Touch Me!"}
            />
        </View>
    )
}

export default LogIn;
