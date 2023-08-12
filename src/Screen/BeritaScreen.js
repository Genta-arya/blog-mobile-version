import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';

const BeritaScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [animatedValue] = useState(new Animated.Value(0)); 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const api = 'http://192.168.247.59:3001/posting/';

  useEffect(() => {
    fetch(`${api}`)
      .then(response => response.json())
      .then(data => {
        setArticles(data.reverse());
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetch(`${api}`)
      .then(response => response.json())
      .then(data => {
        setArticles(data.reverse());
        setIsLoading(false);
      })
      .catch(error => {})
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const uniqueCategories = [
    ...new Set(articles.map(article => article.category)),
  ];

  const handleArticlePress = item => {
    navigation.navigate('Detail', item);
  };

  const formatDate = date => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  const getTimeAgo = date => {
    const currentDate = new Date();
    const articleDate = new Date(date);
    const timeDiff = currentDate - articleDate;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    let timeAgo = '';
    switch (true) {
      case months > 0:
        timeAgo = `${months} bulan yang lalu`;
        break;
      case weeks > 0:
        timeAgo = `${weeks} minggu yang lalu`;
        break;
      case days > 0:
        timeAgo = `${days} hari yang lalu`;
        break;
      case hours > 0:
        timeAgo = `${hours} jam yang lalu`;
        break;
      case minutes > 0:
        timeAgo = `${minutes} menit yang lalu`;
        break;
      default:
        timeAgo = `Baru saja`;
        break;
    }
  
    return timeAgo;
  };
  

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={itemValue => setSelectedCategory(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          <Picker.Item label="Semua Berita" value="all" />
          {uniqueCategories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {isLoading ? (
        <Text>Memuat Data...</Text>
      ) : (
        articles
          .filter(article =>
            selectedCategory === 'all'
              ? true
              : article.category === selectedCategory,
          )
          .map((article, index) => (
            <Animated.View
              key={index}
              style={[
                styles.articleWrapper,
                {
                  opacity: animatedValue,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                style={styles.articleContainer}
                onPress={() => handleArticlePress(article)}>
                {article.image ? (
                  <Image
                    source={{uri: `${api}/${article.image}`}}
                    style={styles.articleImage}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://via.placeholder.com/300x200.png?text=No+Image',
                    }}
                    style={styles.articleImage}
                  />
                )}
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Tag: {article.category}</Text>
                  {index === 0 && (
                    <View style={styles.newTagContainer}>
                      <Text style={styles.newTagText}>Terbaru</Text>
                    </View>
                  )}
                </View>
                <View style={styles.articleInfo}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleDate}>
                    {formatDate(article.date)}
                  </Text>
                  <Text style={styles.articleAuthor}>By {article.author}</Text>
                </View>
                <View style={styles.articleTimeContainer}>
                  <Text style={styles.articleTime}>
                    {getTimeAgo(article.date)}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  picker: {
    margin: 10,
  },
  articleWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
    elevation:5,
  },
  articleContainer: {
    marginBottom: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  articleImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  tagText: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,

    margin: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  newTagContainer: {
    backgroundColor: 'red',
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  newTagText: {
    color: 'white',
    fontSize: 12,
  },
  articleInfo: {
    marginTop: 4,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

  articleDate: {
    color: '#888',
    marginTop: 2,
  },
  articleAuthor: {
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
  articleTimeContainer: {
    bottom: 0,
    right: 0,
    padding: 5,
    marginBottom: 0,
    borderTopLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  articleTime: {
    color: '#888',
    fontSize: 12,
  },
});

export default BeritaScreen;
