import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const puzzles = [
  {question: 'Ibukota Indonesia?', answer: 'jakarta'},
  {question: 'Pulau terbesar di Indonesia?', answer: 'kalimantan'},
  {question: 'Gunung tertinggi di Indonesia?', answer: 'puncak jaya'},
  {question: 'Laut di sebelah utara Pulau Jawa?', answer: 'laut jawa'},
  {question: 'Sungai terpanjang di Indonesia?', answer: 'sungai kapuas'},
  {question: 'Provinsi terluas di Indonesia?', answer: 'papua'},
  {
    question: 'Pulau yang terkenal dengan tradisi kain ikatnya?',
    answer: 'sumba',
  },
  {question: 'Nama presiden pertama Indonesia?', answer: 'soekarno'},
  {question: 'Siapa proklamator Indonesia?', answer: 'soekarno'},
  {question: 'Bahasa resmi Indonesia?', answer: 'bahasa indonesia'},
  {question: 'Siapa paling ganteng didunia?', answer: 'genta'},
  {question: 'Siapa paling cantik didunia?', answer: 'diana'},
  {
    question: 'Pulau terkecil di Indonesia berdasarkan luas?',
    answer: 'pulau roti',
  },
  {question: 'Bentuk pemerintahan Indonesia?', answer: 'republik'},
  {question: 'Monumen nasional di Jakarta?', answer: 'monas'},
  {
    question: 'Provinsi yang terkenal dengan tradisi Tari Kecak?',
    answer: 'bali',
  },
  {
    question: 'Satu-satunya provinsi di Indonesia yang berbentuk kepulauan?',
    answer: 'maluku utara',
  },
  {question: 'Pendiri Pergerakan Nasional Indonesia?', answer: 'budi utomo'},
  {
    question: 'Hewan yang dilindungi sebagai lambang fauna nasional?',
    answer: 'komodo',
  },
  {question: 'Jumlah provinsi di Indonesia saat ini?', answer: '34'},
  {question: 'Benua terdekat dengan Indonesia?', answer: 'australia'},
  {question: 'Nama bandara internasional di Bali?', answer: 'ngurah rai'},
  // Lanjutan pertanyaan tambahan
  {
    question: 'Provinsi yang terletak paling barat di Indonesia?',
    answer: 'aceh',
  },
  {
    question: 'Pulau vulkanik yang terletak di Danau Toba?',
    answer: 'pulau samosir',
  },
  {question: 'Suku adat yang tinggal di Bali?', answer: 'bali'},
  {
    question: 'Nama gajah yang terkenal di Taman Nasional Way Kambas?',
    answer: 'sabai',
  },
  {
    question: 'Nama pantai terkenal di Yogyakarta?',
    answer: 'pantai parangtritis',
  },
  {question: 'Pendiri Dinasti Mataram?', answer: 'panembahan senopati'},
  {
    question:
      'Pahlawan nasional yang terkenal dengan sebutan "Pangeran Diponegoro"?',
    answer: 'diponegoro',
  },
  {question: 'Jenis musik tradisional Jawa?', answer: 'gamelan'},
  {
    question: 'Benteng peninggalan Belanda di Manado?',
    answer: 'fort rotterdam',
  },
  {question: 'Nama pelabuhan laut utama di Indonesia?', answer: 'tanjug priok'},
];

const worldPuzzles = [
  {question: 'Ibukota Jepang?', answer: 'tokyo'},
  {question: 'Gunung tertinggi di dunia?', answer: 'everest'},
  {question: 'Laut terluas di dunia?', answer: 'pasifik'},
  {question: 'Negara terpadat di dunia?', answer: 'china'},
  {question: 'Sungai terpanjang di dunia?', answer: 'amazon'},
  {question: 'Benua terbesar di dunia?', answer: 'asia'},
  {question: 'Negara terkecil di dunia?', answer: 'vatican'},
  {question: 'Pulau terbesar di dunia?', answer: 'greenland'},
  {question: 'Danau terdalam di dunia?', answer: 'baikal'},
  {question: 'Pegunungan tertinggi kedua di dunia?', answer: 'k2'},
  {question: 'Nama samudra terbesar di dunia?', answer: 'samudra pasifik'},
  {question: 'Negara dengan garis pantai terpanjang di dunia?', answer: 'canada'},
  {question: 'Benua terkecil di dunia?', answer: 'australia'},
  {question: 'Salah satu tujuh keajaiban dunia?', answer: 'colosseum'},
  {question: 'Pulau vulkanik terbesar di dunia?', answer: 'iceland'},
  {question: 'Negara pertama yang mencetak buku?', answer: 'china'},
  {question: 'Negara dengan penduduk terbanyak kedua di dunia?', answer: 'india'},
  {question: 'Pulau terpanjang di dunia?', answer: 'greenland'},
  {question: 'Monumen yang terkenal di Mesir?', answer: 'pyramid'},
  {question: 'Nama selat yang menghubungkan Laut Merah dengan Teluk Aden?', answer: 'selat hormuz'},
  {question: 'Ibukota Rusia?', answer: 'moscow'},
  {question: 'Pulau terluar Indonesia yang terletak di Samudra Hindia?', answer: 'pulau rondo'},
  {question: 'Gunung berapi yang terkenal di Indonesia?', answer: 'merapi'},
  {question: 'Pulau yang terkenal dengan kota New York?', answer: 'manhattan'},
  {question: 'Pulau yang terletak di sebelah timur Jawa?', answer: 'bali'},
 
];

const shuffleArray = array => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, 10);
};
const EssayQuizScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [shuffledPuzzles, setShuffledPuzzles] = useState([]);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    loadScore();
  }, []);

  useEffect(() => {
    shuffleAndSetPuzzles();
    setCurrentPuzzleIndex(0);
    setUserAnswer('');
    setRemainingTime(30);
    setScore(0);
    setShowQuestion(false);
  }, [selectedCategory]);

  useEffect(() => {
    saveScore();
    updateHighScore();
  }, [score]);

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      handleAnswerSubmit();
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const shuffleAndSetPuzzles = () => {
    const selectedPuzzles =
      selectedCategory === 'indonesia' ? puzzles : worldPuzzles;
    const shuffledArray = shuffleArray(selectedPuzzles);
    setShuffledPuzzles(shuffledArray.slice(0, 10)); 
    setShowQuestion(true);
  };
  const updateHighScore = () => {
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const saveScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('quiz');
      const currentHighScore = savedHighScore ? JSON.parse(savedHighScore) : 0;

      if (score > currentHighScore) {
        await AsyncStorage.setItem('quiz', JSON.stringify(score));
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const loadScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('quiz');
      if (savedHighScore !== null) {
        setHighScore(JSON.parse(savedHighScore));
      }
    } catch (error) {
      console.error('Error loading score:', error);
    }
  };

  const handleAnswerSubmit = () => {
    const correctAnswer =
      shuffledPuzzles[currentPuzzleIndex].answer.toLowerCase();
    const userEnteredAnswer = userAnswer.toLowerCase();
    if (userEnteredAnswer === correctAnswer) {
      setScore(score + 10);
    }

    if (currentPuzzleIndex < shuffledPuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      setUserAnswer('');
      setRemainingTime(30);
    } else {
      Alert.alert(
        'Permainan Berakhir',
        `Skor Anda: ${score}/100`,
        [{text: 'Main lagi', onPress: resetQuiz}],
      );
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    shuffleArray(selectedCategory === 'indonesia' ? puzzles : worldPuzzles); 
    setCurrentPuzzleIndex(0);
    setUserAnswer('');
    setScore(0);
    setShowQuestion(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz {selectedCategory}</Text>
      {selectedCategory ? (
        showQuestion ? (
          <>
            {shuffledPuzzles.length > 0 &&
              shuffledPuzzles[currentPuzzleIndex] && (
                <View style={styles.answer}>
                  <Text style={styles.questionText}>
                    {shuffledPuzzles[currentPuzzleIndex].question}
                  </Text>
                  <TextInput
                    style={styles.answerInput}
                    value={userAnswer}
                    placeholder="silahkan menjawab"
                    onChangeText={text => setUserAnswer(text)}
                  />
                  <Text style={styles.timer}>
                    Waktu Tersisa: {remainingTime} detik
                  </Text>
                  <Text style={styles.score}>High Score : {highScore}</Text>
                  <Button
                    title="jawab"
                    onPress={handleAnswerSubmit}
                    color={'green'}
                  />
                </View>
              )}
          </>
        ) : (
       
          <Button title="Mulai Quiz" onPress={shuffleAndSetPuzzles} color={"green"}  />
        )
      ) : (
        <View style={styles.categoryButtons}>
          <View style={{marginRight: 10 , width:100}}>
            <Button
              title="Indonesia"
              onPress={() => setSelectedCategory('indonesia')}
              color={selectedCategory === 'indonesia' ? 'green' : 'gray'}
            />
          </View>
          <View style={{marginLeft: 10 , width:100,}}>
            <Button
              title="Dunia"
              onPress={() => setSelectedCategory('Global')}
              color={selectedCategory === 'Global' ? 'green' : 'gray'}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 20,
  },

  answer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  timer: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
export default EssayQuizScreen;
