import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CameraScreen from './src/components/CameraScreen';
import QuizEngine from './src/components/QuizEngine';
import { resetGameData } from './src/utils/storage';

export default function App() {
  const [currentMode, setCurrentMode] = useState('menu'); // 'menu', 'camera', 'quiz'

  const handleResetGame = async () => {
    Alert.alert(
      'Oyunu Sıfırla',
      'Tüm puanlar, seviyeler ve rozetler silinecek. Emin misin?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sıfırla', 
          style: 'destructive',
          onPress: async () => {
            await resetGameData();
            Alert.alert('Başarılı', 'Oyun verileri sıfırlandı!');
          }
        }
      ]
    );
  };

  if (currentMode === 'camera') {
    return <CameraScreen />;
  }

  if (currentMode === 'quiz') {
    return <QuizEngine />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>🐾 Hayvan Keşfi</Text>
        <Text style={styles.subtitle}>Çocuklar için eğitici hayvan oyunu</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setCurrentMode('camera')}
        >
          <Text style={styles.menuButtonText}>📷 Kamera Modu</Text>
          <Text style={styles.menuButtonSubtext}>Kamera ile hayvanları keşfet</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setCurrentMode('quiz')}
        >
          <Text style={styles.menuButtonText}>🎯 Quiz Modu</Text>
          <Text style={styles.menuButtonSubtext}>Sadece quiz oyna</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={handleResetGame}
        >
          <Text style={styles.resetButtonText}>🔄 Oyunu Sıfırla</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Çocuklar için güvenli ve eğitici</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: 20,
  },
  menuButton: {
    backgroundColor: '#3b82f6',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  menuButtonSubtext: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
