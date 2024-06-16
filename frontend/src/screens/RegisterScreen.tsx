// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { register } from '../api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};


const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register(userid, password);
      setMessage('User registered successfully');
      navigation.navigate('Login', {userid, password});
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <View>
      <TextInput placeholder="User ID" value={userid} onChangeText={setUserid} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Button color={'grey'} title="Login" onPress={()=>{navigation.navigate('Login', {userid:userid, password:password})}} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
