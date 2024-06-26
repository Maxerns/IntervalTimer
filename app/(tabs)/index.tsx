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
  intervalTimer: {
    position: 'absolute',
    top: 120,
    fontSize: 48,
    color: '#4E586E',
  },
  roundDisplay: {
    position: 'absolute',
    top: 80,
    fontSize: 24,
    color: '#4E586E',
  },
  pauseButton: {
    marginRight: 20,
  },
  stopButton: {
    marginLeft: 20, 
  },
});

interface AppProps {
  onSettingsClick: () => void;
  intervalTime: number;
  restTime: number;
  preparationTime: number;
  numRounds: number;
}

function App({
  onSettingsClick,
  intervalTime,
  restTime,
  preparationTime,
  numRounds,
}: AppProps) {
  const [currentTime, setCurrentTime] = useState(preparationTime);
  const [isPreparationRunning, setIsPreparationRunning] = useState(false);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(numRounds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handlePlayClick = () => {
    setIsTimerRunning(true);
    setIsPreparationRunning(true);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStopClick = () => {
    setIsPlaying(false);
    setIsTimerRunning(false);
    setCurrentTime(preparationTime);
    setIsPaused(false);
  };

  useEffect(() => {
    setTotalRounds(numRounds);
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && !isPaused) {
      if (isPreparationRunning && currentTime > 0) {
        interval = setInterval(() => {
          setCurrentTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (isPreparationRunning && currentTime === 0) {
        clearInterval(interval!);
        setIsPreparationRunning(false);
        setIsIntervalRunning(true);
        setCurrentTime(intervalTime);
      } else if (isIntervalRunning && currentTime > 0) {
        interval = setInterval(() => {
          setCurrentTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (isIntervalRunning && currentTime === 0) {
        clearInterval(interval!);
        setIsIntervalRunning(false);
        setIsRestRunning(true);
        setCurrentTime(restTime);
      } else if (isRestRunning && currentTime > 0) {
        interval = setInterval(() => {
          setCurrentTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (isRestRunning && currentTime === 0) {
        clearInterval(interval!);
        setIsRestRunning(false);
        setCurrentRound((prevRound) => prevRound + 1);
        if (currentRound < totalRounds) {
          handlePlayClick(); // Call handlePlayClick to start the next round
        } else {
          setIsTimerRunning(false);
          setCurrentRound(1); // Reset the current round
        }
      }
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    isPreparationRunning,
    isIntervalRunning,
    isRestRunning,
    currentTime,
    intervalTime,
    restTime,
    numRounds,
    currentRound,
    totalRounds,
    isTimerRunning,
    isPaused,
  ]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const RoundDisplay = ({ currentRound, totalRounds }: { currentRound: number; totalRounds: number }) => {
    return <Text style={styles.roundDisplay}>Round {currentRound} / {totalRounds}</Text>;
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <RoundDisplay currentRound={currentRound} totalRounds={totalRounds} />
      <View style={styles.playContainer}>
        {isPlaying ? (
          <>
            <TouchableOpacity onPress={handlePauseClick} style={styles.pauseButton}>
              <FontAwesome6 name="pause-circle" size={playSize} color="#4E586E" />
            </TouchableOpacity>
            {isPaused ? (
              <TouchableOpacity onPress={handlePlayClick} style={styles.stopButton}>
                <FontAwesome6 name="play-circle" size={playSize} color="#4E586E" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleStopClick} style={styles.stopButton}>
                <FontAwesome6 name="circle-stop" size={playSize} color="#4E586E" />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity onPress={handlePlayClick}>
            <FontAwesome6 name="play-circle" size={playSize} color="#4E586E" />
          </TouchableOpacity>
        )}
        <Text style={styles.intervalTimer}>
          {isTimerRunning ? formatTime(currentTime) : 'Ready'}
        </Text>
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
  const [numRounds, setNumRounds] = useState(5);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleGoBack = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = (
    intervalTimeValue: number,
    restTimeValue: number,
    preparationTimeValue: number,
    numRoundsValue: number
  ) => {
    setIntervalTime(intervalTimeValue);
    setRestTime(restTimeValue);
    setPreparationTime(preparationTimeValue);
    setNumRounds(numRoundsValue);
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
      numRounds={numRounds}
    />
  );
};

export default MainScreen;