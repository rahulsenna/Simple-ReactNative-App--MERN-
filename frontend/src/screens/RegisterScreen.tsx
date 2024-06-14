// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { register } from '../api';

const RegisterScreen: React.FC = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register(userid, password);
      setMessage('User registered successfully');
    } catch (error: any) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <View>
      <TextInput placeholder="User ID" value={userid} onChangeText={setUserid} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
