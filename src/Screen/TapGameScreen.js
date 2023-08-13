import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FruitySlashGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [fruits, setFruits] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Waktu permainan dalam detik
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const fruitSize = 50;

  // Waktu hilang buah berdasarkan level (dalam milidetik)
  const fruitDisappearTimes = [0, 5000, 3000, 2000]; // Index 0 digunakan untuk padding

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    // Muat skor tertinggi saat komponen diinisialisasi
    loadHighScore();

    if (gameOver) {
      // Simpan skor tertinggi jika mencapai skor baru yang lebih tinggi
      if (score > highScore) {
        setHighScore(score);
        saveHighScore(score);
      }
      return;
    }

    if (!gameStarted) {
      return;
    }

    const spawnFruit = setInterval(() => {
      const newFruit = {
        id: new Date().getTime(),
        x: Math.random() * (screenWidth - fruitSize),
        y: Math.random() * (screenHeight - fruitSize - 100),
      };
      setFruits(prevFruits => [...prevFruits, newFruit]);

      setTimeout(() => {
        setFruits(prevFruits =>
          prevFruits.filter(fruit => fruit.id !== newFruit.id),
        );
      }, fruitDisappearTimes[currentLevel]);
    }, 1000);

    const gameTimer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setGameOver(true);
        clearInterval(spawnFruit);
        clearInterval(gameTimer);
      }
    }, 1000);

    return () => {
      clearInterval(spawnFruit);
      clearInterval(gameTimer);
    };
  }, [gameOver, timeLeft, currentLevel, gameStarted, score, highScore]);

  useEffect(() => {
    if (score >= 50) {
      setCurrentLevel(3);
    } else if (score >= 30) {
      setCurrentLevel(2);
    } else if (score >= 20) {
      setCurrentLevel(1);
    }
  }, [score]);

  const handleSlash = id => {
    if (!gameOver && gameStarted) {
      setScore(score + 1);
      setFruits(prevFruits => prevFruits.filter(fruit => fruit.id !== id));
    }
  };

  const handleStartGame = () => {
    const levelDescription = getLevelDescription(currentLevel);
    Alert.alert(
      'Game Started',
      'Tap warna dilayar anda!\n\nlevel 1 : score = 0 , warna akan hilang dalam 5 detik\n\nlevel 2 : score > 30 , warna akan hilang dalam 3 detik\n\nlevel 3 : score > 50 warna akan hilang dalam 2 detik',
      [{text: 'Start', onPress: () => setGameStarted(true)}],
    );
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
    setCurrentLevel(1);
    setGameStarted(false);
  };

  const getLevelDescription = level => {
    if (level === 1) {
      return 'Level 1: Score 20 to advance to Level 2';
    } else if (level === 2) {
      return 'Level 2: Score 30 to advance to Level 3';
    } else if (level === 3) {
      return 'Level 3: Score 50 to Win!';
    }
    return '';
  };

  // Fungsi untuk memuat skor tertinggi dari penyimpanan
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

  // Fungsi untuk menyimpan skor tertinggi ke penyimpanan
  const saveHighScore = async newHighScore => {
    try {
      await AsyncStorage.setItem('highScore', newHighScore.toString());
    } catch (error) {
      console.log('Error saving high score:', error);
    }
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.highScore}>High Score: {highScore}</Text>
          <TouchableOpacity
            onPress={handlePlayAgain}
            style={styles.playAgainButton}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.highScore}>High Score: {highScore}</Text>
          <Text style={styles.level}>Level: {currentLevel}</Text>
          <Text style={styles.timeLeft}>Waktu : {timeLeft} detik</Text>
          {gameStarted ? (
            fruits.map(fruit => (
              <TouchableOpacity
                key={fruit.id}
                style={[
                  styles.fruit,
                  {left: fruit.x, top: fruit.y, backgroundColor: randomColor()},
                ]}
                onPress={() => handleSlash(fruit.id)}
                activeOpacity={1} // Tambahkan ini untuk mencegah highlight tombol saat ditekan
              />
            ))
          ) : (
            <TouchableOpacity
              onPress={handleStartGame}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const randomColor = () => {
  const colors = [
    '#FF5733',
    '#FFD700',
    '#32CD32',
    '#9370DB',
    '#87CEFA',
    '#FF1493',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  level: {
    fontSize: 18,
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  timeLeft: {
    fontSize: 18,
    marginBottom: 10,
  },
  fruit: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  highScore: {
    fontSize: 18,
    marginBottom: 10,
  },
  gameOverContainer: {
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  playAgainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  startButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FruitySlashGame;
