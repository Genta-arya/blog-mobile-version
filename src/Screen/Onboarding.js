import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import gambar from '../Asset/Header.png';
import FeatherIcon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

const description =
  'Aplikasi ini didedikasikan untuk memberikan informasi terkini seputar Nahdlatul Ulama (NU), organisasi Islam terbesar di Indonesia. Dapatkan berita-berita, artikel, dan informasi menarik tentang NU langsung di genggaman Anda. Nikmati pengalaman eksplorasi berbagai kategori berita NU.';

const Onboarding = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const swipeTextAnim = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      slideAnim.setValue(gestureState.dx);

      if (gestureState.dx < -50) {
        swipeTextAnim.setValue(0);
      } else {
        swipeTextAnim.setValue(1);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50) {
        navigation.replace('Tabs');
      }
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    },
  });

  const animateSwipeText = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(swipeTextAnim, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(swipeTextAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  React.useEffect(() => {
    animateSwipeText();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slide,
          {
            transform: [{translateX: slideAnim}],
          },
        ]}
        {...panResponder.panHandlers}>
        <Image source={gambar} style={styles.headerImage} />
        <View style={styles.Content}>
          <Text style={styles.welcomeText}>NU News</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View style={styles.circleIconsContainer}>
          <FeatherIcon
            name="circle"
            size={20}
            color="black"
            style={styles.circleIcon}
          />
          <FeatherIcon
            name="circle"
            size={20}
            color="black"
            style={styles.circleIcon}
          />
          <FeatherIcon
            name="circle"
            size={20}
            color="black"
            style={styles.circleIcon}
          />
        </View>
        <Animated.Text
          style={[
            styles.swipeText,
            {
              transform: [
                {
                  translateX: swipeTextAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10],
                  }),
                },
              ],
            },
          ]}>
          Swipe untuk melanjutkan
        </Animated.Text>
        <FeatherIcon name="arrow-right" size={32} color="gray" style={{marginTop:20,}}/>
       
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff",
  },
  Content: {
    borderWidth: 1,
    padding: 10,
    borderColor:"green",
    borderRadius: 8,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  headerImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginBottom:10,
  },
  swipeText: {
    fontSize: 14,
    marginTop: 25,
    color: 'gray',
    alignSelf: 'center',
    
  },
  circleIconsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  circleIcon: {
    marginHorizontal: 5,
  },
});

export default Onboarding;
