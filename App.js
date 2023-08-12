import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MyStack from './src/Navigation/Navigation';

const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: 'white',
          card: 'white',
          primary: '#004D40',
          text: 'gray', 
        },
        dark: false, 
      }}
    >
      <MyStack />
    </NavigationContainer>
  );
}

export default App;
