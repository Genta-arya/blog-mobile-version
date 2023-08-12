import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import AboutScreen from '../Screen/AboutScreen';
import BeritaScreen from '../Screen/BeritaScreen';
import BookmarkScreen from '../Screen/BookmarkScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let IconComponent;
          let iconName;

          if (route.name === 'Home') {
            IconComponent = MaterialIcon;
            iconName = focused ? 'article' : 'article';
          } else if (route.name === 'Bookmark') {
            IconComponent = FontistoIcon;
            iconName = focused ? 'favorite' : 'favorite';
          } else if (route.name === 'About') {
            IconComponent = Feather;
            iconName = focused ? 'info' : 'info';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={BeritaScreen}
        options={{
          title: 'Berita',
          headerStyle: {backgroundColor: '#004D40'},
          headerTitleStyle: {color: 'white'},
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          title: 'Bookmark',
          headerStyle: {backgroundColor: '#004D40'},
          headerTitleStyle: {color: 'white'},
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'Tentang Kami',
          headerStyle: {backgroundColor: '#004D40'},
          headerTitleStyle: {color: 'white'},
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
