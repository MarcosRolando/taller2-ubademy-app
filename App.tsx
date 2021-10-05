import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import foo from './src/foo';
import LogIn from './src/LogIn';

export default function App() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <LogIn withUsername="Marcos" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
