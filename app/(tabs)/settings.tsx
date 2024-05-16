import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    zIndex: 0,
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
  content: {
    position: 'absolute',
    padding: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

const SettingsPage = () => {
  const [intervalTime, setIntervalTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);

  const handleIntervalTimeChange = (value: string) => {
    setIntervalTime(parseInt(value));
  };

  const handleRestTimeChange = (value: string) => {
    setRestTime(parseInt(value));
  };

  const handlePreparationTimeChange = (value: string) => {
    setPreparationTime(parseInt(value));
  };

  const handleSubmit = () => {
    console.log('Interval Time:', intervalTime);
    console.log('Rest Time:', restTime);
    console.log('Preparation Time:', preparationTime);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <View style={styles.content}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Interval App Settings</Text>
        <Text style={{ color: '#fff' }}>Interval Time (in seconds):</Text>
        <TextInput
          keyboardType="numeric"
          value={intervalTime.toString()}
          onChangeText={handleIntervalTimeChange}
          style={{ color: '#fff' }}
        />
        <Text style={{ color: '#fff' }}>Rest Time (in seconds):</Text>
        <TextInput
          keyboardType="numeric"
          value={restTime.toString()}
          onChangeText={handleRestTimeChange}
          style={{ color: '#fff' }}
        />
        <Text style={{ color: '#fff' }}>Preparation Time (in seconds):</Text>
        <TextInput
          keyboardType="numeric"
          value={preparationTime.toString()}
          onChangeText={handlePreparationTimeChange}
          style={{ color: '#fff' }}
        />
        <Button title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default SettingsPage;