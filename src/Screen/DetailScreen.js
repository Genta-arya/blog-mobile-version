import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({route, navigation}) => {
  const {title, date, author, isi, image, category} = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [bookmarkData, setBookmarkData] = useState(null);
  const imageUrl = `http://192.168.247.59:3001/${image}`;

  const formatDate = date => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    fetch('http://192.168.247.59:3001/posting/')
      .then(response => response.json())
      .then(data => {
        setRelatedArticles(
          data.filter(
            item => item.category === category,
          ),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    loadBookmarkState();
  }, []);

  const handleArticlePress = async item => {
    try {
      const savedState = await AsyncStorage.getItem(
        `bookmarkState_${item.title}`,
      );
      if (savedState !== null) {
        const parsedState = JSON.parse(savedState);
        navigation.navigate('Detail', {
          ...item,
          isBookmarked: parsedState.isBookmarked,
        });
      } else {
        navigation.navigate('Detail', {...item, isBookmarked: false});
      }
    } catch (error) {
      console.error('Error checking bookmark state:', error);
    }
  };

  const handleBackToTop = () => {
    scrollViewRef.scrollTo({y: 0, animated: true});
  };

  const handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 100) {
      setIsArrowVisible(true);
    } else {
      setIsArrowVisible(false);
    }
  };

  const loadBookmarkState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(`bookmarkState_${title}`);
      if (savedState !== null) {
        const parsedState = JSON.parse(savedState);
        setIsBookmarked(parsedState.isBookmarked);
      }
    } catch (error) {
      console.error('Error loading bookmark state:', error);
    }
  };

  const saveBookmarkState = async newState => {
    try {
      const bookmarkData = {
        title,
        date,
        author,
        isi,
        image,
        category,
        isBookmarked: newState,
      };
      await AsyncStorage.setItem(
        `bookmarkState_${title}`,
        JSON.stringify(bookmarkData),
      );
    } catch (error) {
      console.error('Error saving bookmark state:', error);
    }
  };

  const toggleBookmark = async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    if (newBookmarkState) {
      const newData = {
        title,
        date,
        author,
        isi,
        image,
        category,
        isBookmarked: newBookmarkState,
      };
      setBookmarkData(newData);
      saveBookmarkState(newData);
      navigation.navigate('Bookmark');
    } else {
      removeBookmarkState();
    }
  };

  const removeBookmarkState = async () => {
    try {
      await AsyncStorage.removeItem(`bookmarkState_${title}`);
    } catch (error) {
      console.error('Error removing bookmark state:', error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref => (scrollViewRef = ref)}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>Tag: {category}</Text>
            </View>
            <TouchableOpacity
              onPress={toggleBookmark}
              style={styles.bookmarkButton}>
              {!isBookmarked ? ( 
                <FontistoIcon name="favorite" size={24} color="black" />
              ) : null}
              
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.infoText}>
            <Text style={styles.date}>{formatDate(date)}</Text> by{' '}
            <Text style={styles.author}>{author}</Text>
          </Text>
          <HTML source={{html: isi}} contentWidth={350} />
        </View>
        {relatedArticles.length > 0 && (
          <View style={styles.relatedArticlesContainer}>
            <Text style={styles.relatedTitle}>Baca Juga</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedArticlesScroll}>
              {relatedArticles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.relatedArticleContainer}
                  onPress={() => handleArticlePress(item)}>
                  {item.image ? (
                    <Image
                      source={{uri: `http://192.168.247.59:3001/${item.image}`}}
                      style={styles.relatedArticleImage}
                    />
                  ) : null}
                  <Text style={styles.relatedArticleTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      {isArrowVisible && (
        <TouchableOpacity
          style={styles.backToTopButton}
          onPress={handleBackToTop}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookmarkButton: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkedText: {
    color: 'green',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 250,
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    marginBottom: 10,
  },
  categoryTag: {
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#888',
    marginBottom: 16,
  },
  date: {
    color: '#888',
  },
  author: {
    fontWeight: 'bold',
    color: '#333',
  },
  relatedArticlesContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relatedArticlesScroll: {
    flexDirection: 'row',
  },
  relatedArticleContainer: {
    width: 200,
    marginRight: 5,
    marginLeft:5,
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    elevation:1,
  },
  relatedArticleImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop:-10,
    marginBottom: 4,
   
  },
  relatedArticleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:5,
    marginRight:5,
  },
  relatedArticleDate: {
    color: '#888',
  },
  backToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 30,
    width: 32,
    height: 32,
    marginBottom: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
