import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const api = 'http://192.168.247.59:3001/posting/';
const pageSize = 10; // Jumlah data per request

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const fetchArticles = () => {
    if (isFetching || endReached) {
      return;
    }

    setIsFetching(true);

    fetch(`${api}?limit=${pageSize}&offset=${articles.length}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setEndReached(true);
        } else {
          setArticles(prevArticles => [...prevArticles, ...data]);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const renderArticle = ({ item }) => (
    <View style={styles.articleContainer}>
      <Image source={{ uri: `http://192.168.247.59/${item.image}` }} style={styles.articleImage} />
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDate}>{item.date}</Text>
      <Text style={styles.articleAuthor}>{item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={fetchArticles}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  articleContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  articleDate: {
    color: '#888',
    marginTop: 4,
  },
  articleAuthor: {
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default HomeScreen;
