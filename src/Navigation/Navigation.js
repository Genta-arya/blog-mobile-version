import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './BottomTabs';
import DetailScreen from '../Screen/DetailScreen';
import {StatusBar} from 'react-native';
import Onboarding from '../Screen/Onboarding';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <>
      <StatusBar backgroundColor="#004D40" barStyle="light-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
            barStyle: 'light-content', // Untuk iOS (warna teks putih)
          }}
        />
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Baca sekarang',
            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: 'black',
            headerShown: true,
            headerRight: () => (
              <StatusBar barStyle="dark-content" backgroundColor="white" />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default MyStack;
