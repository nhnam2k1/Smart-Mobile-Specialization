import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSlider = ({ label, value, onValueChange }) => {
    return (
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>{label}: {value}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          value={5}
          step={1}
          onValueChange={onValueChange}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    sliderContainer: {
      marginBottom: 5,
      marginTop: 5,
    },
    sliderLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0,
    },
    slider: {
      width: '100%',
    },
  });

  export default CustomSlider;