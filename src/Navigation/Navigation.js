import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './BottomTabs';
import DetailScreen from '../Screen/DetailScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
function MyStack() {
    return (
      <>
        <StatusBar backgroundColor="#004D40" barStyle="light-content" /> 
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: '', headerStyle: { backgroundColor: '#004D40' }, headerTintColor: '#fff' }} 
          />
        </Stack.Navigator>
      </>
    );
}
export default MyStack;
