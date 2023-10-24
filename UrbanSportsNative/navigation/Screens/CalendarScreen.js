import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';

import ActivityCard from '../../components/ActivityCard';
import NavigationComponent from '../../components/NavigationComponent';

const BottomBarHeight = 110;
const screenHeight = Dimensions.get('window').height;

const CALENDAR_HEIGHT = 240;
const FRAME_HEIGHT = 120;

export default function Activitycalendar({ navigator }) {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [currentActivityListPos, setCurrentActivityListPos] = React.useState(80); // 230
  const [activiyHeight, setActivityHeight] = React.useState(610); // 460
  const [activityCards, setActivityCards] = useState([]);

  useEffect(() => {
      const action = async()=>{
          let numActivities = await AsyncStorage.getItem("activities");
          if (numActivities == null) numActivities = 0
          else numActivities = parseInt(numActivities);
          let arr = [];
          for (let i = 0; i < numActivities; i++) arr.push(<ActivityCard key={i}/>);
          setActivityCards(arr);
      };
      action().catch(console.error);
  }, [AsyncStorage.getItem("activities")]);

  const showCalendarHandler = React.useCallback(() => {
    setCurrentActivityListPos(prevState => prevState == 80 ? 455 : 80);
    setActivityHeight(prevState => prevState == 610 ? 240 : 610);
    setShowCalendar(prevState => !prevState);
  }, []);

  const changableActivityFrame = {
    position: "absolute",
    top: currentActivityListPos,
    width: '90%',
    height: activiyHeight,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  };

  const [highlightedDates, setHighlightedDates] = useState({
    '2023-06-01': { selected: true, selectedColor: '#69C123'},
    '2023-06-05': { selected: true, selectedColor: '#69C123' },
    '2023-07-05': { selected: true, selectedColor: '#69C123'},
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

 const handleDayPress = (day) => {
    const isHighlightedDate = highlightedDates[day.dateString];
    if (isHighlightedDate) {
      setSelectedDate(day.dateString);
      setShowModal(true);
    }
  };


  const selectedText = selectedDate ? `Date: ${selectedDate} Activity: Running` : '';

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#e8edea' }}>

      {/* Rest of the goal frame contents */}
      <View style={styles.infoFrame}>
        <View style={styles.titleFrame}>
          <Pressable style={styles.calendarIcon} onPress={showCalendarHandler}>
            <Icon name="list" size={32} color="white" />
          </Pressable>
          <Text style={styles.infoText}>Activities</Text>
          <NavigationComponent/>
        </View>
      </View>

      {showCalendar && <View style={styles.calendarFrame}><Calendar style={{ borderRadius: 16 }} markedDates={highlightedDates}
          markingType={'simple'}
          onDayPress={handleDayPress} />
          
          <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>{selectedText}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={{marginLeft:90,marginTop:6,color:'red'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          
          </View>}

      <View style={changableActivityFrame}>
        <ScrollView>{activityCards}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8edea',
  },
  infoFrame: {
    position: 'absolute',
    width: '100%',
    height: 220,
    left: 0,
    top: 0,
    backgroundColor: '#69C123',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  titleFrame: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 25
  },
  infoText: {
    position: "relative",
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  calendarFrame: {
    position: "absolute",
    top: 85,
    width: '90%',
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  // top: 230 when calendar not open with length 460, 470 when calendar open with height 220, it means calendar it self will be 470-230 = 240
  goalFrame: {
    position: "absolute",
    top: 230,
    width: '100%',
    height: 460,
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#69C123',
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsIcon: {
    position: 'relative',
    top: 5
  },
  calendarIcon: {
    position: 'relative',
    top: 5
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
});
