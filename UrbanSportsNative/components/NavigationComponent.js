import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavigationComponent = () => {
  const navigation = useNavigation();

  const newActivityHandler = React.useCallback(() => {
    navigation.navigate('NewActivity');
  }, [navigation]);

  return (
    <Pressable style={styles.settingsIcon} onPress={newActivityHandler}>
    <Icon name="plus-circle" size={32} color="white" />
  </Pressable >
  );
};


const styles = StyleSheet.create({
settingsIcon: {
    position: 'relative',
    top: 5
  },
})

export default NavigationComponent;
