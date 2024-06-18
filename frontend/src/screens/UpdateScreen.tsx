// src/screens/UpdateScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../App';
import { updateUser } from '../api';
import { RootStackParamList } from '../types';

type UpdateScreenRouteProp = RouteProp<RootStackParamList, 'Update'>;
type UpdateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Update'>;

type Props = {
  route: UpdateScreenRouteProp;
  navigation: UpdateScreenNavigationProp;
};

const UpdateScreen: React.FC<Props> = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext)!;

  const [name, setName] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      if (age !== undefined) {
        await updateUser(name, age);
        setMessage('User details updated');
      } else {
        setMessage('Please enter a valid age');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Update failed');
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Age" value={age?.toString()} onChangeText={(text) => setAge(Number(text))} keyboardType="numeric" />
      <Button title="Update" onPress={handleUpdate} />
      {message ? <Text>{message}</Text> : null}
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

export default UpdateScreen;
