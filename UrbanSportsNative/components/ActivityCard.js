import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Chart from "../assets/chart.png";
import AntDesign from 'react-native-vector-icons/AntDesign';

const ActivityCard = () => {
  const navigation = useNavigation();

  const handlePress = () => {
      navigation.navigate("Chart");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.activityCard}>
        <View style={{ position: "relative", flexDirection: "row" }}>
          <Image source={Chart} style={styles.image} />
          <View style={{ flexDirection: 'column', position: 'relative', marginLeft: 5 }}>
            <Text style={styles.minorDetail}>May 25th</Text>
            <Text style={styles.mainDetail}>Pain endured: 5</Text>
            <Text style={styles.mainDetail}>Effectiveness: 6</Text>
            <Text style={styles.minorDetail}>1 hour 25 mins</Text>
          </View>
        </View>
        <AntDesign name={'right'} size={32} color={'grey'} />
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  activityCard: {
    position: 'relative',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    marginBottom: 0,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    height: 70,
    width: 70,
    backgroundColor: "gray",
    position: 'relative',
    borderRadius: 10
  },
  minorDetail: {
    fontSize: 11,
  },
  mainDetail: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#333333',
    opacity: 0.1,
    margin: 5
  }
});

export default ActivityCard;
