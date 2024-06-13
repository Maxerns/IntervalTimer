import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, Text, Button, Image, Dimensions } from 'react-native';

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
  firstHeader: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff',
    alignSelf: 'center',
  },
  intervalText: {
    color: '#fff',
    alignSelf: 'center',
  },
  restText: {
    color: '#fff',
    alignSelf: 'center',
  },
  preparationText: {
    color: '#fff',
    alignSelf: 'center',
  },
  numRoundsText: {
    color: '#fff',
    alignSelf: 'center',
  },
  picker: {
    height: 50,
    width: 100,
    color: '#fff',
    alignSelf: 'center',
  },
  pickerFlex: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: { 
    backgroundColor: '#4E586E',
    margin: 5,
    alignSelf: 'center',
  },
});

interface SettingsPageProps {
  onGoBack: () => void;
  onSaveSettings: (
    intervalTime: number,
    restTime: number,
    preparationTime: number,
    numRounds: number
  ) => void;
}

const SettingsPage = ({ onGoBack, onSaveSettings }: SettingsPageProps) => {
  const [intervalMinutes, setIntervalMinutes] = useState('00');
  const [intervalSeconds, setIntervalSeconds] = useState('00');
  const [restMinutes, setRestMinutes] = useState('00');
  const [restSeconds, setRestSeconds] = useState('00');
  const [preparationMinutes, setPreparationMinutes] = useState('00');
  const [preparationSeconds, setPreparationSeconds] = useState('00');
  const [numRounds, setNumRounds] = useState('5');

  const handleSubmit = () => {
    const intervalTimeInSeconds = parseInt(intervalMinutes) * 60 + parseInt(intervalSeconds);
    const restTimeInSeconds = parseInt(restMinutes) * 60 + parseInt(restSeconds);
    const preparationTimeInSeconds = parseInt(preparationMinutes) * 60 + parseInt(preparationSeconds);
    const totalRounds = parseInt(numRounds);
    onSaveSettings(intervalTimeInSeconds, restTimeInSeconds, preparationTimeInSeconds, totalRounds);
    onGoBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <View style={styles.content}>
        <Text style={styles.firstHeader}>Interval App Settings</Text>
        <Text style={styles.intervalText}>Interval Time:</Text>
        <View style={styles.pickerFlex}>
          <Picker
            style={styles.picker}
            selectedValue={intervalMinutes}
            onValueChange={(itemValue: string) => setIntervalMinutes(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
          <Text style={styles.picker}>:</Text>
          <Picker
            style={styles.picker}
            selectedValue={intervalSeconds}
            onValueChange={(itemValue: string) => setIntervalSeconds(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.restText}>Rest Time:</Text>
        <View style={styles.pickerFlex}>
          <Picker
            style={styles.picker}
            selectedValue={restMinutes}
            onValueChange={(itemValue: string) => setRestMinutes(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
          <Text style={styles.picker}>:</Text>
          <Picker
            style={styles.picker}
            selectedValue={restSeconds}
            onValueChange={(itemValue: string) => setRestSeconds(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.preparationText}>Preparation Time:</Text>
        <View style={styles.pickerFlex}>
          <Picker
            style={styles.picker}
            selectedValue={preparationMinutes}
            onValueChange={(itemValue: string) => setPreparationMinutes(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
          <Text style={styles.picker}>:</Text>
          <Picker
            style={styles.picker}
            selectedValue={preparationSeconds}
            onValueChange={(itemValue: string) => setPreparationSeconds(itemValue)}
          >
            {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.numRoundsText}>Number of Rounds:</Text>
        <Picker
          style={styles.picker}
          selectedValue={numRounds}
          onValueChange={(itemValue: string) => setNumRounds(itemValue)}
        >
          {Array.from({ length: 20 }, (_, i) => String(i + 1)).map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <View style={styles.button}>
           <Button title="Save" onPress={handleSubmit} color="#4E586E" />
        </View>
        <View style={styles.button}>
           <Button title="Go Back" onPress={onGoBack} color="#4E586E" />
        </View>
      </View>
    </View>
  );
};

export default SettingsPage;