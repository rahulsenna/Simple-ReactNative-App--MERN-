// App.tsx
import React from 'react';
import {DarkTheme, NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import UpdateScreen from './src/screens/UpdateScreen';
import { RootStackParamList } from './src/types';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();


const App: React.FC = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{}}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
