import { StyleSheet, Text, View, Image, ScrollView, Pressable, TextInput } from 'react-native';  
import { useState, useEffect, Suspense } from "react";
import { BarChart } from "react-native-gifted-charts";

import profileImage from '../../assets/placeholder-profile-picture.png';

const data = [ {value:70}, {value:80}, {value:90}, {value:70}, {value:100}, 
               {value:80}, {value:90}, {value:270}, {value:90}, {value:80}, 
               {value:90}, {value:70}, {value:80}, {value:80} ];

const data2 = [ {value:70}, {value:80}, {value:90}, {value:70}, {value:100}, 
                {value:80}, {value:90}, {value:270}, {value:90}, {value:80}, 
                {value:90}, {value:70}, {value:80}, {value:80} ];

const data3 = [ {value:70}, {value:80}, {value:90}, {value:70}, {value:100}, 
                    {value:80}, {value:90}, {value:270}, {value:90}, {value:80}, 
                    {value:90}, {value:70}, {value:80}, {value:80} ];
    

export default function ChartScreen(){
    const [threshold, setThreshold] = useState(700);
    const [percentages, setPercentages] = useState([]);
    const [isNewton, setIsNewton] = useState(true);

    const chartData = convertToChartData(data);
    const chartDataKg = convertToChartDataKg(data2);
    const chartDataScale = convertToChartScale(data3);
    
    useEffect(() => {
        const bodyWeight = 70; // Assuming body weight is 70 kg
        const gravity = 9.8; // Gravity constant in m/s^2
        const generating = async () =>{
            let data = [];
            for (i = 0; i < 100; i++){
                let sampleData = { packetCount: i, sampleTimeFine: (i+1)*10, 
                                   quatX: Math.random(), quatY: Math.random(), quatZ: Math.random(), 
                                   accelerationX: Math.random(), accelerationY: Math.random(), accelerationZ: Math.random() };
                data.push(sampleData);
            }
            return data;
        }
        let style = {color: 'blue', fontSize: 12, marginBottom: 6};
        let labelComponent = (value) => <Text style={style}>{value}</Text>

        const processHeavy = async (data) => {
            const result = data.map((item) => {
                const accelerationMagnitude = Math.sqrt(
                    Math.pow(item.accelerationX, 2) +
                    Math.pow(item.accelerationY, 2) +
                    Math.pow(item.accelerationZ, 2)
                );
                const forceOfImpact = (accelerationMagnitude * bodyWeight) / gravity;
                const bodyWeightPercentage = (forceOfImpact / bodyWeight) * 100;

                return {
                    label: item.sampleTimeFine,
                    value: bodyWeightPercentage,
                    topLabelComponent: () => labelComponent(bodyWeightPercentage)
                };
            });
            return result;
        };

        const fetchData = async () => {
            let data = await generating();
            let processed = await processHeavy(data);
            setPercentages(processed);
        };
        //fetchData().catch(console.error);
    }, []);

    const switchHandles = () => {
        setIsNewton(prev => !prev);
    };

    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <View style={styles.infoFrame}>
                <View style={{flexDirection: "row", width: '100%'}}>
                    <Image source={profileImage} style={styles.profileImage}/>
                    <View style={styles.nameStatusFrame}>
                        <Text style={styles.nameStyle}>Hello, <Text style={{fontWeight:"bold"}}>John Doe</Text></Text>
                        <Text style={styles.statusStyle}>Beginner</Text>
                    </View>
                </View>
            </View>
            <View style={{position: "relative", marginTop: 5, flex: 1, width: "90%"}}>
            <ScrollView>
                <View style={{flexDirection: "row", padding: 5}}>
                    <Text style={styles.titleStyle}>Player Impact</Text>
                    <Pressable style={{flex: 2, backgroundColor: '#69C123', width: '100%', padding: 30, borderRadius: 10, margin: 5}} 
                               onPress={switchHandles}>
                        <Text style={{color: "white", alignSelf: "center", fontSize: 28}}>{isNewton ?  "Newton" : "Kg"}</Text>
                    </Pressable>
                </View>
                <Suspense fallback={<Text>Player Impact is loading...</Text>}>
                    {isNewton ?
                        <BarChart showReferenceLine1 frontColor={'#69C123'}
                              referenceLine1Position={threshold}
                              data={chartData} yAxisLabelSuffix={"N"}/>
                    :
                        <BarChart showReferenceLine1 frontColor={'#69C123'}
                                referenceLine1Position={threshold}
                                data={chartDataKg} yAxisLabelSuffix={"Kg"}/>
                    }
                    
                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderLabel}>Threshold</Text>
                        <TextInput onChangeText={setThreshold} style={styles.thresholdStyle}
                                value={threshold} maxLength={4}
                                placeholder="700"
                                keyboardType="numeric"/>
                    </View>
                </Suspense>
                <Text style={styles.titleStyle}>Player Impact Scale</Text>
                <BarChart data={chartDataScale}/>
            </ScrollView>
            </View>
        </View>
    );
}

const convertToChartData = (rawData) => {
    let result = [];  
    let style = {color: 'blue', fontSize: 12, marginBottom: 6};
    rawData.forEach(val => {
          let newObj = val;
          let newValue = val.value * 10;
          newObj.topLabelComponent = () => <Text style={style}>{newValue}</Text>
          result.push(newObj);
      });
    len = result.length;
    result[0].label = "Start Time";
    result[len-1].label = "End Time";
    return result;
};

const convertToChartDataKg = (rawData) => {
    let result = [];  
    let style = {color: 'blue', fontSize: 12, marginBottom: 6};
    rawData.forEach(val => {
          let newObj = val;
          let newValue = val.value;
          newObj.topLabelComponent = () => <Text style={style}>{newValue}</Text>
          result.push(newObj);
      });
    len = result.length;
    result[0].label = "Start Time";
    result[len-1].label = "End Time";
    return result;
};

const convertToChartScale = (rawData) => {
    let result = [];  
    let style = {color: 'blue', fontSize: 12, marginBottom: 6};
    rawData.forEach(val => {
          let newObj = val;
          let newValue = val.value / 70.0;
          newObj.topLabelComponent = () => <Text style={style}>{newValue}</Text>
          newObj.frontColor = newValue <= 1.0 ? '#69C123': newValue <= 3.0 ? '#ede615' : '#bf1e06';
          result.push(newObj);
      });
    len = result.length;
    result[0].label = "Start Time";
    result[len-1].label = "End Time";
    return result;
};

const convertToStatisticChart = (rawData) => {
    let style = {color: 'blue', fontSize: 12, marginBottom: 6};
    let labelComponent = (value) => <Text style={style}>{value}</Text>
    let avg = rawData.reduce((current, b) => current + b.value, 0) / rawData.length;
    let maxValue = rawData.reduce((current, b) => Math.max(current, b.value), -1);
    let data = [{value: maxValue, label: "Max", topLabelComponent: () => labelComponent(maxValue)}, 
                {value: avg, label: "Average", topLabelComponent: () => labelComponent(avg)}];
    return data;
};


const styles = StyleSheet.create({
    infoFrame: {
        position: 'relative',
        width: '100%',
        height: 125,
        left: 0,
        top: 0,
        backgroundColor: '#69C123',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 25,
        paddingTop: 50,
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
        marginLeft: 20
    },
    statusStyle:{
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 13,
        letterSpacing: 0.01,
        color: '#F3F7FF',
    },
    nameStyle:{
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 17,
        letterSpacing: 0.01,
        color: '#F3F7FF',
    },
    titleStyle: {
        fontWeight: 'bold', 
        fontSize: 24, 
        alignSelf: "center", 
        margin: 20
    },
    sliderContainer: {
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
      },
      sliderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0,
      },
      slider: {
        width: '100%',
      },
      thresholdStyle: {
        height: 40,
        width: '60%',
        borderWidth: 1,
        padding: 10,
        color: 'black'
      },
});