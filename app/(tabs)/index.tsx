import {StyleSheet, View, Image, Dimensions} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232731',
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
});

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hulamain.png')} style={styles.hulaMainImage} />
      <Image source={require('../../assets/images/hulaoverlay.png')} style={styles.hulaOverlayImage} />
      <Feather name="settings" size={24} color="#4E586E" />
      <FontAwesome6 name="play-circle" size={24} color="#4E586E" />
    </View>
  );
}