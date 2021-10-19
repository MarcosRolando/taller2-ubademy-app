import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';


const screen = Dimensions.get('window');

const Login = (props: any) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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
                style={styles.textInput}
                disableFullscreenUI={true}
            />

            <TextInput
                label='Password'
                secureTextEntry={true}
                textContentType="newPassword"
                value={password}
                onChangeText={(password) => setPassword(password)}
                mode='outlined'
                style={styles.textInput}
                disableFullscreenUI={false}
            />

            <Button mode='contained' style={styles.button}>
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
});