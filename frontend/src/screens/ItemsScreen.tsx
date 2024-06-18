import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import { AuthContext } from '../../App';
import { getItems } from '../api';
import { Item } from '../types';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
type ItemsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type Props = {
  navigation: ItemsScreenNavigationProp;
};

const ItemsScreen: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<Item[]>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { items, totalPages } = await getItems(page);
        setItems(items);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [page, authContext?.userToken]); // `authContext?.userToken` So react calls _fetchItems()_ when user logs in or out.

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleBuy = (item_id: string) => {
    // TODO: handle buying an item
  };

  return (
    <View>
      {!authContext?.userToken ? 
      (<Button title="Login" onPress={() => navigation.navigate('Login')} />) :
      (<Button title="Logout" onPress={() => authContext.signOut()} />)
      }
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.img_url }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Seller: {item.seller.name}</Text>
            <Button title="Buy" onPress={() => handleBuy(item._id)} />
          </View>
        )}
      />
      <View>
        <Button title="Previous" onPress={handlePrevPage} disabled={page <= 1} />
        <Text>Page {page} of {totalPages}</Text>
        <Button title="Next" onPress={handleNextPage} disabled={page >= totalPages} />
      </View>
    </View>
  );
};

export default ItemsScreen;

