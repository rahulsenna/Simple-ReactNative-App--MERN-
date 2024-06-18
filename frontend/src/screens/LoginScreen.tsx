// src/screens/LoginScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { login } from '../api';
import { RootStackParamList } from '../types';
import { AuthContext } from '../../App';

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { signIn } = useContext(AuthContext)!;

  const handleLogin = async () => {
    try {
      const { token } = await login(userid, password);
      signIn({ token });
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <View>
      <TextInput placeholder="User ID" value={userid} onChangeText={setUserid} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button  color={'pink'} title="Register" onPress={()=>{navigation.navigate('Register')}} />
      {message ? <Text>{message}</Text> : null}
    </View>);
};

export default LoginScreen;