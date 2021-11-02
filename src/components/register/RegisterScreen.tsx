import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './Signup';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, 
    widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Login from './Login'; 

const RegisterStack = createNativeStackNavigator();

const SignupView = ({navigation}: any) => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Signup navigation={navigation} style={styles.container}/>
        </ScrollView>
      </View>
    );
}

const LoginView = ({navigation}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Login navigation={navigation} style={styles.container}/>
      </ScrollView>
    </View>
  );
}

const RegisterScreen = () => {
    return (
      <RegisterStack.Navigator screenOptions={{headerShown:false}}>
        <RegisterStack.Screen name='Signup' component={SignupView} />
        <RegisterStack.Screen name='Login' component={LoginView} />
      </RegisterStack.Navigator>
    );
}

export default RegisterScreen;


const styles = StyleSheet.create({
  container: {
    paddingTop: hp(15), 
    paddingHorizontal: wp(15),
  },
});
