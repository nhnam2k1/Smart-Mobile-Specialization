import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityCard from '../../components/ActivityCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

import profileImage from '../../assets/placeholder-profile-picture.png';
import Sportman from '../../assets/sportman.png';

const BottomBarHeight = 110;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen({navigation}){
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

    return (
       <View style={{flex: 1, alignItems:'center', justifyContent:'center'}} >
            <View style={styles.infoFrame}>
                <Image source={profileImage} style={styles.profileImage}/>
                <View style={styles.nameStatusFrame}>
                        <Text style={styles.nameStyle}>Hello, <Text style={{fontWeight:"bold"}}>John Doe</Text></Text>
                        <Text style={styles.statusStyle}>Beginner</Text>
                </View>
                <AntDesign name='setting' color={'#F3F7FF'} size={32}/>
            </View>
            <View style={styles.goalFrame}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.weekGoal}>Week Goal  <Text style={{color:"#69C123"}}>5 Trainings</Text></Text>
                    <AntDesign name={'right'} size={24} color={'grey'}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                    <Text>4 trainnings done</Text>
                    <Text style={{color: "#333333", opacity: 0.7}}>1 left</Text>
                </View>
                <View style={{position: 'relative', marginTop: 10}}>
                    <View style={styles.commonProgressBar}/>
                    <View style={styles.currentProgressBar}/>
                </View>
            </View>
            <View style={styles.currentActivity}>
                <View style={{flexDirection: "row"}}>
                    <Image source={Sportman} style={styles.sportmanLogo}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.currentActivityStyle}>Current Activity</Text>
                        <Text style={{...styles.currentActivityStyle, opacity: 0.9, fontSize: 11}}>01:00:05</Text>
                    </View>
                </View>
                <Text style={styles.currentActivityStyle}>Max Force</Text>
            </View>
            <View style={styles.subTitle}>
                <Text style={styles.commonTitle}>Recent activity</Text>
                <Text style={{...styles.commonTitle, color: '#69C123'}}> All</Text>
            </View>
            <View style={styles.activityFrame}>
                <ScrollView>{activityCards}</ScrollView>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    infoFrame: {
        position: 'absolute',
        width: '100%',
        height: 232,
        left: 0,
        top: 0,
        backgroundColor: '#69C123',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 25,
        paddingTop: 50,
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
        position: 'relative',
        width: 64,
        height: 64,
    },
    nameStatusFrame:{
        position: 'relative',
        width: 200,
        height: 32,
        left: -25
    },
    statusStyle:{
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 13,
        letterSpacing: 0.01,
        color: '#F3F7FF',
        marginLeft:40,

    },
    nameStyle:{
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 17,
        letterSpacing: 0.01,
        color: '#F3F7FF',
        marginLeft:40,
        marginTop:15
    },
    goalFrame: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '90%',
        height: 120,
        top: 136,
        marginLeft: 24,
        marginRight: 24,
        padding: 24,
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
    weekGoal: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 17,
    },
    commonProgressBar:{ 
        position: "absolute",
        top: 0,
        height: 10,
        width: '100%',
        backgroundColor: "#333333",
        opacity: 0.1,
        borderRadius: 10
    },
    currentProgressBar: {
        position: "absolute",
        top: 0,
        height: 10,
        backgroundColor: "#69C123", 
        width: "80%", 
        borderRadius: 10
    },
    currentActivity: {
        position: 'absolute',
        width: '90%',
        height: 64,
        top: 284,
        backgroundColor: '#69C123',
        borderRadius: 30,
        paddingTop:10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    sportmanLogo: {
        width: 44, 
        height: 44, 
        backgroundColor: '#FFFFFF', 
        borderRadius: 22,
        transform: [{scaleX: -1}],
    },
    currentActivityStyle: {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0.01,
        color: '#F3F7FF',
    },
    subTitle: {
        position: 'absolute',
        width: '90%',
        height: 17,
        top: 376,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    commonTitle: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
    },
    activityFrame: {
        position: 'absolute',
        width: '90%',
        height: screenHeight - 409 - BottomBarHeight,
        top: 409,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});