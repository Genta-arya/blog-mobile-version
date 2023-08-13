import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkScreen = ({navigation}) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const api = 'http://192.168.247.59:3001/posting/';

  useEffect(() => {
    loadBookmarkedItems();
    const interval = setInterval(() => {
      loadBookmarkedItems();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const loadBookmarkedItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const bookmarkedKeys = keys.filter(key =>
        key.startsWith('bookmarkState_'),
      );
      const bookmarkedData = await AsyncStorage.multiGet(bookmarkedKeys);
      const parsedData = bookmarkedData.map(item => JSON.parse(item[1]));
      setBookmarkedItems(parsedData);
    } catch (error) {
      console.error('Error loading bookmarked items:', error);
    }
  };

  const handleItemClick = item => {
    navigation.navigate('Detail', item);
  };

  const handleSwipeRight = item => {
    Alert.alert(
      'Hapus Bookmark',
      `Anda yakin ingin menghapus "${item.title}" dari bookmark?`,
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => removeBookmark(item),
        },
      ],
    );
  };

  const removeBookmark = async item => {
    try {
      await AsyncStorage.removeItem(`bookmarkState_${item.title}`);
      loadBookmarkedItems();
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {bookmarkedItems.length > 0 ? (
          bookmarkedItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleItemClick(item)}
              onLongPress={() => handleSwipeRight(item)}>
              <Image
                source={{uri: `${api}/${item.image}`}}
                style={styles.image}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>By: {item.author}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noBookmarkText}>
            Tidak ada bookmark yang tersimpan
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  itemContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#004D40',
    marginBottom: 3,
    borderRadius: 10,
 

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#888',
  },
  noBookmarkText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookmarkScreen;
