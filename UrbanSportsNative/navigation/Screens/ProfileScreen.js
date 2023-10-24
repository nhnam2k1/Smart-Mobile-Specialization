import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TabItem from '../../components/TabItem';
import profileImage from '../../assets/placeholder-profile-picture.png';
import react, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeModules, Platform} from 'react-native';
import PersonalParameters from './PersonalParameters';

export default function ProfileScreen({navigation}) {
  const nav = useNavigation();
  const [tabOpenState, setTabOpenState] = useState(false);

  const tabs = [
    {icon: 'person', title: 'Personal Parameters'},
    {icon: 'trophy', title: 'Achievements'},
    {icon: 'settings', title: 'Settings'},
    {icon: 'call', title: 'Contact Us'},
  ];

  const renderItem = ({item}) => {
    return (
      <TabItem
        icon={item.icon}
        title={item.title}
        onPress={() => handleTabPress(item.title)}
      />
    );
  };

  const handleTabPress = tabTitle => {
    // Handle tab press based on the title
    console.log(`Pressed tab: ${tabTitle}`);
    setTabOpenState(true);
  };

  const [logout, setSuccess] = useState(false);

  const handleLogout = () => {
    if (Platform.OS === 'android') {
      NativeModules.DevSettings.reload();
    } else if (Platform.OS === 'ios') {
      NativeModules.ReactNativeRestart.Restart();
    }
  };
  return tabOpenState ? (
    <PersonalParameters setTabOpenState={setTabOpenState} />
  ) : (
    <View style={styles.profileContainer}>
      {/* Personal_frame */}
      <View style={styles.personalFrame}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
      </View>

      {/* Iconex/Light/Edit 1 */}
      <View style={styles.iconContainer}>
        {/* Add your icon component here */}
      </View>

      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={tabs}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F7FF',
  },
  personalFrame: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    backgroundColor: '#69C123',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  iconContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    paddingHorizontal: 10,
    marginTop: 180,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
