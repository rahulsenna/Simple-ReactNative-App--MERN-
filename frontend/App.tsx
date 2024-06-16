// App.tsx
import React, { useEffect, useState, createContext, useMemo } from 'react';
import {DarkTheme, NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import * as Keychain from 'react-native-keychain';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import UpdateScreen from './src/screens/UpdateScreen';
import { RootStackParamList } from './src/types';
import { StyleSheet } from 'react-native';

type AuthContextType = {
  signIn: (data: { token: string }) => void;
  signOut: () => void;
  userToken: string | null
};

export const AuthContext = createContext<AuthContextType | null>(null);

const Stack = createNativeStackNavigator<RootStackParamList>();


const App: React.FC = () => {

  const [state, setState] = useState({
    isLoading: true,
    isSignout: false,
    userToken: null as string | null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          userToken = credentials.password;
        }
      } catch (e) {
        console.error(e);
      }

      setState({ isLoading: false, isSignout: false, userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data: { token: string }) => {
        await Keychain.setGenericPassword('user', data.token);
        setState({ ...state, isSignout: false, userToken: data.token });
      },
      signOut: async () => {
        await Keychain.resetGenericPassword();
        setState({ ...state, isSignout: true, userToken: null });
      },
      userToken: state.userToken
    }),
    [state]
  );
  
  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
  <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <Stack.Screen name="Update" component={UpdateScreen} />
          )}
      </Stack.Navigator>

    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
