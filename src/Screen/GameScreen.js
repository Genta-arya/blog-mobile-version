import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameScreen = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    loadHighScore();
    loadQuizScore();

    const interval = setInterval(() => {
      loadHighScore();
      loadQuizScore();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playFlappyBird = () => {
    navigation.navigate('FlappyBird');
  };

  const goToQuiz = () => {
    navigation.navigate('Quiz'); // Replace 'Quiz' with the correct screen name for your Quiz screen
  };

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('highScore');
      if (savedHighScore !== null) {
        setHighScore(parseInt(savedHighScore));
      }
    } catch (error) {
      console.log('Error loading high score:', error);
    }
  };

  const loadQuizScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('quiz');
      if (savedHighScore !== null) {
        setQuizScore(parseInt(savedHighScore));
      }
    } catch (error) {
      console.log('Error loading high score:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>Quiz</Text>
        <Text style={styles.highScore}>High Score: {quizScore}/100</Text>
        <TouchableOpacity style={styles.playButton} onPress={goToQuiz}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>Tap-Tap</Text>
        <Text style={styles.highScore}>High Score: {highScore}</Text>
        <TouchableOpacity style={styles.playButton} onPress={playFlappyBird}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>Game Lainya</Text>
        <Text style={styles.lainya}> ~~~ Segera Hadir ~~~ </Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  lainya: {
    fontSize: 18,
    marginBottom: 10,
  },
  gameContainer: {
    marginVertical: 5,
    paddingVertical: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highScore: {
    fontSize: 14,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen;
