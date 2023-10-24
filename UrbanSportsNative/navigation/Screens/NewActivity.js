import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker, {types} from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import CustomSlider from '../../components/CustomSlider';

const NewActivityScreen = () => {
  const [painEndured, setPainEndured] = useState(5);
  const [effectiveness, setEffectiveness] = useState(5);
  const [qualityOfSleep, setQualityOfSleep] = useState(5);
  const [happiness, setHappiness] = useState(5);
  const [motivation, setMotivation] = useState(5);
  const [file, setFile] = useState(null);

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (file == null){
        Alert.alert('Unsuccess', 'Missing CSV file to upload !');
        return;
    }
    const successTask = async() => {
        let numActivities = await AsyncStorage.getItem("activities");
        if (numActivities == null) numActivities = 0
        else numActivities = parseInt(numActivities);
        numActivities = numActivities + 1;
        await AsyncStorage.setItem("activities", numActivities.toString());
        navigation.goBack();
        Alert.alert('Success', 'Uploaded successfully');
    }
    successTask().catch(console.error);
  }
    
  const handleUpload = async () => {
    // Handle upload
    try {
        const pickerResult = await DocumentPicker.pickSingle({
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
          type: [types.csv, types.pdf],
        })
        setFile(pickerResult);
    } catch (e) {
        console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>New Activity</Text>
      <Text style={styles.text}>Activity Name</Text>
      <TextInput style={styles.input} placeholder="Enter a name" />

      {/* Upload document button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>

      {/* Sliders */}
      <View style={styles.sliderContainer}>
        <CustomSlider
          label='Pain Endured'
          value={painEndured}
          onValueChange={setPainEndured}
        />
     
      {/* Slider 2 */}
      
        <CustomSlider
          label='Effectiveness'
          value={effectiveness}
          onValueChange={setEffectiveness}
        />
      

      {/* Slider 3 */}
      
        <CustomSlider
          label='Quality of Sleep'
          value={qualityOfSleep}
          onValueChange={setQualityOfSleep}
        />
      

      {/* Slider 4 */}
      
        <CustomSlider
          label='Happiness'
          value={happiness}
          onValueChange={setHappiness}
        />
      

      {/* Slider 5 */}
      
        <CustomSlider
          label='Motivation'
          value={motivation}
          onValueChange={setMotivation}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Activity</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  input: {
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#69C123',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButton: {
    borderRadius: 50,
    backgroundColor: '#69C123',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  Title: {
    position: "relative",
    color: '#69C123',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
  },
  sliderContainer: {
    margin: 15,
  }
});

export default NewActivityScreen;
