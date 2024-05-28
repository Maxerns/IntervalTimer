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
  const [intervalTime, setIntervalTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

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
    const intervalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    onSaveSettings(intervalTimeInSeconds, restTime, preparationTime);
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
        <Picker
  style={{ height: 50, width: 100, color: '#fff' }}
  selectedValue={minutes}
  onValueChange={(itemValue: string) => setMinutes(itemValue)}
>
  {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
    <Picker.Item key={value} label={value} value={value} />
  ))}
</Picker>
<Text style={{ fontSize: 24, color: '#fff' }}>:</Text>
<Picker
  style={{ height: 50, width: 100, color: '#fff' }}
  selectedValue={seconds}
  onValueChange={(itemValue: string) => setSeconds(itemValue)}
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