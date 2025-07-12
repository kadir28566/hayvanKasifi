import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions
} from 'react-native';
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

const QuizEngine = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

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

  const startNewQuiz = () => {
    const animalKey = getRandomAnimal();
    const animal = animalQuestions[animalKey];
    const question = getRandomQuestion(animalKey);
    
    setCurrentAnimal(animal);
    setCurrentQuestion(question);
    setShowQuiz(true);
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    console.log('Yeni hayvan:', animal.name);
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
    
    // 2 saniye sonra yeni quiz başlat
    setTimeout(() => {
      setShowQuiz(false);
      setTimeout(startNewQuiz, 500);
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

  if (!showQuiz) {
    return (
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Puan: {score}</Text>
          <Text style={styles.statsText}>Seviye: {level}</Text>
          <Text style={styles.statsText}>Doğru Cevap: {correctAnswers}</Text>
        </View>
        
        <TouchableOpacity style={styles.startButton} onPress={startNewQuiz}>
          <Text style={styles.startButtonText}>Hayvan Keşfet! 🐾</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Puan: {score}</Text>
        <Text style={styles.statsText}>Seviye: {level}</Text>
        <Text style={styles.statsText}>Doğru: {correctAnswers}</Text>
      </View>

      <View style={styles.animalContainer}>
        <Image source={currentAnimal.image} style={styles.animalImage} />
        <Text style={styles.animalName}>{currentAnimal.name}</Text>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  animalContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  animalImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  animalName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  answersContainer: {
    gap: 10,
  },
  answerButton: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
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
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default QuizEngine; 