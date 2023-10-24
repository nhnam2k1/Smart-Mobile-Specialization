import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const TabItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <View style={styles.tabItemContent}>
        <View style={{flexDirection:'row'}}>
            <IonIcon name={icon} size={24} color="black" style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
        </View>
        <IonIcon name="chevron-forward" size={24} color="black" style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    display: 'flex',
  },
  tabItemContent: {
    flexDirection: 'row',
    paddingHorizontal:10,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    padding: 25,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontSize: 16,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default TabItem;
