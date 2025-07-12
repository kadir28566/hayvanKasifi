import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  StatusBar
} from 'react-native';
// Expo SDK 49+ için yeni import
import { CameraView, useCameraPermissions } from 'expo-camera';
import { getRandomAnimal, getRandomQuestion, animalQuestions } from '../data/questions';
import {
  saveScore,
  getScore,
  saveLevel,
  getLevel,
  saveCorrectAnswers,
  getCorrectAnswers,
  addBadge
} from '../utils/storage';

const { width, height } = Dimensions.get('window');

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('back');
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnimal, setShowAnimal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    const savedScore = await getScore();
    const savedLevel = await getLevel();
    const savedCorrectAnswers = await getCorrectAnswers();
    
    setScore(savedScore);
    setLevel(savedLevel);
    setCorrectAnswers(savedCorrectAnswers);
  };

  const handleScreenTap = () => {
    if (!showAnimal && !showQuiz) {
      startNewAnimal();
    }
  };

  const startNewAnimal = () => {
    const animalKey = getRandomAnimal();
    const animal = animalQuestions[animalKey];
    const question = getRandomQuestion(animalKey);
    
    setCurrentAnimal(animal);
    setCurrentQuestion(question);
    setShowAnimal(true);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    console.log('Yeni hayvan:', animal.name);
    
    // 3 saniye sonra quiz'i göster
    setTimeout(() => {
      setShowAnimal(false);
      setShowQuiz(true);
    }, 3000);
  };

  const handleAnswerSelect = async (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const newScore = score + 10;
      const newCorrectAnswers = correctAnswers + 1;
      
      setScore(newScore);
      setCorrectAnswers(newCorrectAnswers);
      
      await saveScore(newScore);
      await saveCorrectAnswers(newCorrectAnswers);
      
      // Seviye atlama kontrolü
      if (newCorrectAnswers % 3 === 0) {
        const newLevel = level + 1;
        setLevel(newLevel);
        await saveLevel(newLevel);
        
        // Rozet ekleme
        const badgeName = `Seviye ${newLevel} Rozeti`;
        const badgeAdded = await addBadge(badgeName);
        
        Alert.alert(
          '🎉 Tebrikler!',
          `Seviye ${newLevel}'e yükseldin!\nYeni rozet kazandın: ${badgeName}`,
          [{ text: 'Devam Et', onPress: () => {} }]
        );
      } else {
        Alert.alert(
          '✅ Doğru!',
          '+10 puan kazandın!',
          [{ text: 'Devam Et', onPress: () => {} }]
        );
      }
    } else {
      Alert.alert(
        '❌ Yanlış!',
        `Doğru cevap: ${currentQuestion.correctAnswer}`,
        [{ text: 'Devam Et', onPress: () => {} }]
      );
    }
    
    // 2 saniye sonra yeni hayvan başlat
    setTimeout(() => {
      setShowQuiz(false);
      setShowAnimal(false);
    }, 2000);
  };

  const getAnswerButtonStyle = (answer) => {
    if (!isAnswered) {
      return styles.answerButton;
    }
    
    if (answer === currentQuestion.correctAnswer) {
      return [styles.answerButton, styles.correctAnswer];
    }
    
    if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
      return [styles.answerButton, styles.wrongAnswer];
    }
    
    return styles.answerButton;
  };

  // İzin kontrolü
  if (!permission) {
    return <View style={styles.container}><Text>Kamera izni kontrol ediliyor...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Kamera kullanmak için izin gerekli</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <CameraView 
        style={styles.camera} 
        facing={cameraType}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          {/* Üst bilgi çubuğu */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Puan: {score}</Text>
            <Text style={styles.statsText}>Seviye: {level}</Text>
            <Text style={styles.statsText}>Doğru: {correctAnswers}</Text>
          </View>

          {/* Hayvan görseli */}
          {showAnimal && currentAnimal && (
            <View style={styles.animalOverlay}>
              <Image source={currentAnimal.image} style={styles.animalImage} />
              <Text style={styles.animalName}>{currentAnimal.name}</Text>
            </View>
          )}

          {/* Quiz */}
          {showQuiz && currentQuestion && (
            <View style={styles.quizOverlay}>
              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
                
                <View style={styles.answersContainer}>
                  {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={getAnswerButtonStyle(option)}
                      onPress={() => handleAnswerSelect(option)}
                      disabled={isAnswered}
                    >
                      <Text style={styles.answerText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Ana ekran */}
          {!showAnimal && !showQuiz && (
            <View style={styles.mainScreen}>
              <Text style={styles.instructionText}>
                Ekrana dokun ve hayvanları keşfet! 🐾
              </Text>
            </View>
          )}

          {/* Dokunma alanı */}
          <TouchableOpacity
            style={styles.touchArea}
            onPress={handleScreenTap}
            activeOpacity={1}
          />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  permissionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 50,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  animalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  animalImage: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  animalName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  quizOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  questionContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 25,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 30,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: '#e3f2fd',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  correctAnswer: {
    backgroundColor: '#c8e6c9',
    borderColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: '#ffcdd2',
    borderColor: '#f44336',
  },
  answerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    paddingHorizontal: 40,
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CameraScreen;