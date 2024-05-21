import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
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
}

function App({ onSettingsClick }: AppProps) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <View style={styles.playContainer}>
        <FontAwesome6 name="play-circle" size={playSize} color="#4E586E" />
      </View>
      <TouchableOpacity style={styles.settingsContainer} onPress={onSettingsClick}>
        <Feather name="settings" size={settingSize} color="#4E586E" />
      </TouchableOpacity>
    </View>
  );
}

const MainScreen = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleGoBack = () => {
    setShowSettings(false);
  };

  return showSettings ? (
    <SettingsPage onGoBack={handleGoBack} />
  ) : (
    <App onSettingsClick={handleSettingsClick} />
  );
};

export default MainScreen;