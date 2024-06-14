// src/screens/UpdateScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { updateUser } from '../api';
import { RootStackParamList } from '../types';

type UpdateScreenRouteProp = RouteProp<RootStackParamList, 'Update'>;
type UpdateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Update'>;

type Props = {
  route: UpdateScreenRouteProp;
  navigation: UpdateScreenNavigationProp;
};

const UpdateScreen: React.FC<Props> = ({ route }) => {
  const { token } = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      if (age !== undefined) {
        await updateUser(token, name, age);
        setMessage('User details updated');
      } else {
        setMessage('Please enter a valid age');
      }
    } catch (error: any) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Age" value={age?.toString()} onChangeText={(text) => setAge(Number(text))} keyboardType="numeric" />
      <Button title="Update" onPress={handleUpdate} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default UpdateScreen;
