import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "./Screens/HomeScreen";
import CalendarScreen from "./Screens/CalendarScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import NewActivity from "./Screens/NewActivity";
import ChartScreen from "./Screens/ChartScreen";

//Screen Names
const homeName = "Dashboard";
const calendarName = "Activity";
const profileName = "Profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ActivityStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Activities"
        component={CalendarScreen}
        options={{title: 'Activities'}}
      />
      <Stack.Screen
        name="NewActivity"
        component={NewActivity}
        options={{ title: 'New Activity' }}
      />
    </Stack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Homepage"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Chart"
        component={ChartScreen}
        options={{ title: 'Summarized Training' }}
      />
    </Stack.Navigator>
  );
};

export default function MainContainer() {
  return (
    <NavigationContainer >
      <Tab.Navigator
        InitialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === calendarName) {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            }
            return <IonIcon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          headerShown: false 
        }}
      >
        <Tab.Screen name={homeName} component={HomeStackScreen} />
        <Tab.Screen name={calendarName} component={ActivityStackScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
