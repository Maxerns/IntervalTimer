import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import SettingsPage from './settings';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const settingSize = Math.floor(windowWidth * 0.1);
const playSize = Math.floor(windowWidth * 0.3);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232731',
    position: 'relative',
  },
  hulaMainImage: {
    width: windowWidth * 1,
    height: windowHeight * 1,
    opacity: 0.8,
  },
  hulaOverlayImage: {
    width: windowWidth * 1,
    height: windowHeight * 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.15,
  },
  settingsContainer: {
    position: 'absolute',
    top: 50,
    left: 350,
    flexDirection: 'row',
  },
  playContainer: {
    position: 'absolute',
    top: 150,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

interface AppProps {
  onSettingsClick: () => void;
  intervalTime: number;
  restTime: number;
  preparationTime: number;
}

function App({ onSettingsClick, intervalTime }: AppProps) {
  const [remainingTime, setRemainingTime] = useState(intervalTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handlePlayClick = () => {
    setIsTimerRunning(true);
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isTimerRunning) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <View style={styles.playContainer}>
        <TouchableOpacity onPress={handlePlayClick}>
          <FontAwesome6 name="play-circle" size={playSize} color="#4E586E" />
        </TouchableOpacity>
        <Text style={{ fontSize: 48, color: '#4E586E' }}>{remainingTime}</Text>
      </View>
      <TouchableOpacity style={styles.settingsContainer} onPress={onSettingsClick}>
        <Feather name="settings" size={settingSize} color="#4E586E" />
      </TouchableOpacity>
    </View>
  );
}

const MainScreen = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [intervalTime, setIntervalTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleGoBack = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = (
    intervalTimeValue: number,
    restTimeValue: number,
    preparationTimeValue: number
  ) => {
    setIntervalTime(intervalTimeValue);
    setRestTime(restTimeValue);
    setPreparationTime(preparationTimeValue);
  };

  return showSettings ? (
    <SettingsPage
      onGoBack={handleGoBack}
      onSaveSettings={handleSaveSettings}
    />
  ) : (
    <App
      onSettingsClick={handleSettingsClick}
      intervalTime={intervalTime}
      restTime={restTime}
      preparationTime={preparationTime}
    />
  );
};

export default MainScreen;