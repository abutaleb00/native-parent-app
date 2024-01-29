import React from 'react';
import {View, StyleSheet} from 'react-native';
import Slider from './component/Slider';
import {useRoute} from '@react-navigation/native';
const PhotoViewer = () => {
  const route = useRoute();
  const {data} = route.params as any;

  return (
    <View style={styles.container}>
      <Slider imgData={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default PhotoViewer;
