import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SCORE: 'animal_quiz_score',
  LEVEL: 'animal_quiz_level',
  BADGES: 'animal_quiz_badges',
  CORRECT_ANSWERS: 'animal_quiz_correct_answers'
};

export const saveScore = async (score) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SCORE, score.toString());
  } catch (error) {
    console.error('Puan kaydedilirken hata:', error);
  }
};

export const getScore = async () => {
  try {
    const score = await AsyncStorage.getItem(STORAGE_KEYS.SCORE);
    return score ? parseInt(score) : 0;
  } catch (error) {
    console.error('Puan alınırken hata:', error);
    return 0;
  }
};

export const saveLevel = async (level) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LEVEL, level.toString());
  } catch (error) {
    console.error('Seviye kaydedilirken hata:', error);
  }
};

export const getLevel = async () => {
  try {
    const level = await AsyncStorage.getItem(STORAGE_KEYS.LEVEL);
    return level ? parseInt(level) : 1;
  } catch (error) {
    console.error('Seviye alınırken hata:', error);
    return 1;
  }
};

export const saveCorrectAnswers = async (correctAnswers) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CORRECT_ANSWERS, correctAnswers.toString());
  } catch (error) {
    console.error('Doğru cevap sayısı kaydedilirken hata:', error);
  }
};

export const getCorrectAnswers = async () => {
  try {
    const correctAnswers = await AsyncStorage.getItem(STORAGE_KEYS.CORRECT_ANSWERS);
    return correctAnswers ? parseInt(correctAnswers) : 0;
  } catch (error) {
    console.error('Doğru cevap sayısı alınırken hata:', error);
    return 0;
  }
};

export const saveBadges = async (badges) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  } catch (error) {
    console.error('Rozetler kaydedilirken hata:', error);
  }
};

export const getBadges = async () => {
  try {
    const badges = await AsyncStorage.getItem(STORAGE_KEYS.BADGES);
    return badges ? JSON.parse(badges) : [];
  } catch (error) {
    console.error('Rozetler alınırken hata:', error);
    return [];
  }
};

export const addBadge = async (badge) => {
  try {
    const currentBadges = await getBadges();
    if (!currentBadges.includes(badge)) {
      const newBadges = [...currentBadges, badge];
      await saveBadges(newBadges);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Rozet eklenirken hata:', error);
    return false;
  }
};

export const resetGameData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SCORE,
      STORAGE_KEYS.LEVEL,
      STORAGE_KEYS.BADGES,
      STORAGE_KEYS.CORRECT_ANSWERS
    ]);
  } catch (error) {
    console.error('Oyun verileri sıfırlanırken hata:', error);
  }
}; 