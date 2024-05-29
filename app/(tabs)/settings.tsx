import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, Text, Button, Image, Dimensions,} from 'react-native';

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

interface SettingsPageProps {
  onGoBack: () => void;
  onSaveSettings: (intervalTime: number, restTime: number, preparationTime: number) => void;
}

const SettingsPage = ({ onGoBack, onSaveSettings }: SettingsPageProps) => {
  const [intervalMinutes, setIntervalMinutes] = useState('00');
  const [intervalSeconds, setIntervalSeconds] = useState('00');
  const [restMinutes, setRestMinutes] = useState('00');
  const [restSeconds, setRestSeconds] = useState('00');
  const [preparationMinutes, setPreparationMinutes] = useState('00');
  const [preparationSeconds, setPreparationSeconds] = useState('00');

  const handleSubmit = () => {
    const intervalTimeInSeconds = parseInt(intervalMinutes) * 60 + parseInt(intervalSeconds);
    const restTimeInSeconds = parseInt(restMinutes) * 60 + parseInt(restSeconds);
    const preparationTimeInSeconds = parseInt(preparationMinutes) * 60 + parseInt(preparationSeconds);
    onSaveSettings(intervalTimeInSeconds, restTimeInSeconds, preparationTimeInSeconds);
    onGoBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <View style={styles.content}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Interval App Settings</Text>
        <Text style={{ color: '#fff' }}>Interval Time:</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* Interval Time Picker */}
          <Picker
            style={{ height: 50, width: 100, color: '#fff' }}
            selectedValue={intervalMinutes}
            onValueChange={(itemValue: string) => setIntervalMinutes(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
          <Text style={{ fontSize: 24, color: '#fff' }}>:</Text>
          <Picker
            style={{ height: 50, width: 100, color: '#fff' }}
            selectedValue={intervalSeconds}
            onValueChange={(itemValue: string) => setIntervalSeconds(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>

        <Text style={{ color: '#fff' }}>Rest Time:</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* Rest Time Picker */}
          <Picker
            style={{ height: 50, width: 100, color: '#fff' }}
            selectedValue={restMinutes}
            onValueChange={(itemValue: string) => setRestMinutes(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
          <Text style={{ fontSize: 24, color: '#fff' }}>:</Text>
          <Picker
            style={{ height: 50, width: 100, color: '#fff' }}
            selectedValue={restSeconds}
            onValueChange={(itemValue: string) => setRestSeconds(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>

        <Text style={{ color: '#fff' }}>Preparation Time:</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* Preparation Time Picker */}
          <Picker
            style={{ height: 50, width: 100, color: '#fff' }}
            selectedValue={preparationMinutes}
            onValueChange={(itemValue: string) => setPreparationMinutes(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
          <Text style={{ fontSize: 24, color: '#fff' }}>:</Text>
          <Picker
            style={{ height: 50, width: 100, color: '#fff' }}
            selectedValue={preparationSeconds}
            onValueChange={(itemValue: string) => setPreparationSeconds(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>

        <Button title="Save" onPress={handleSubmit} />
        <Button title="Go Back" onPress={onGoBack} />
      </View>
    </View>
  );
};

export default SettingsPage;