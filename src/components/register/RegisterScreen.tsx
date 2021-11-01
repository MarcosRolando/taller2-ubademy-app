import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Register';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, 
    widthPercentageToDP as wp} from 'react-native-responsive-screen';

const RegisterStack = createNativeStackNavigator();

const RegisterWrapper = ({navigation}: any) => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Register navigation={navigation} style={styles.container}/>
        </ScrollView>
      </View>
    );
}

const RegisterScreen = () => {
    return (
      <RegisterStack.Navigator screenOptions={{headerShown:false}}>
        <RegisterStack.Screen name='Register' component={RegisterWrapper} />
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
