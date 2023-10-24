import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import profileImage from '../../assets/placeholder-profile-picture.png';
import {LineChart} from 'react-native-gifted-charts';

const dataMonth = [
  {value: 50},
  {value: 80},
  {value: 90},
  {value: 70},
  {value: 40},
  {value: 90},
];

export default function Login(props) {
  const closePopUp = () => {
    props.setTabOpenState(false);
  };

  const chartDataMonth = convertToChartDataMonth(dataMonth);

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.personalFrame}>
          <TouchableOpacity style={styles.backButton} onPress={closePopUp}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.profileName}>John Doe</Text>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.darkTextTitle}>Peresonal Parameters</Text>
          <Text style={styles.darkText}>
            Weight (kg): <Text style={styles.textt}> 72 Kg</Text>
          </Text>

          <Text style={styles.darkText}>
            AVG total impact per session(BMP):
            <Text style={styles.textt}> 100 N</Text>
          </Text>
          <Text style={styles.darkText}>
            Total Session: <Text style={styles.textt}> 24</Text>
          </Text>
          <Text style={styles.darkText}>Total training time: </Text>
          <Text style={styles.darkText}>
            Sport: <Text style={styles.textt}> Parkour</Text>
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.darkTextTitle}>Progress</Text>

          <LineChart
            data={chartDataMonth}
            lineColor="green" // Change the line color to green
            strokeWidth={2} // Adjust the line width as needed
            yAxisLabelSuffix={'N'}
            backgroundColor={'white'}
            areaChart
            hideDataPoints
            isAnimated
            animationDuration={1200}
            startFillColor="#69C123"
            startOpacity={0.6}
            endOpacity={0.3}
            thickness={5}
            showVerticalLines
            color="#69C123"
          />

          <LineChart
            data={chartDataMonth}
            lineColor="green" // Change the line color to green
            strokeWidth={2} // Adjust the line width as needed
            hidePoints={false} // Show data points
            hideXAxis={false} // Show x-axis
            hideYAxis={false} // Show y-axis
            hideLegend={true} // Hide the legend
            yAxisLabelSuffix={'N'}
            thickness={2}
            color1="gray"
            backgroundColor={'white'}
            dataPointsColor1="green"
            dataPointsRadius={2}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const convertToChartDataMonth = rawDataMonth => {
  let result = [];
  let months = ['January', 'February', 'March', 'April', 'May', 'June'];
  rawDataMonth.forEach((val, index) => {
    let newObj = {...val};
    newObj.label = months[index % 12];
    result.push(newObj);
  });
  return result;
};
const styles = StyleSheet.create({
  container: {
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
    paddingLeft: 20,
    marginTop: 230,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  logoutButton: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#69C123',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  darkText: {
    fontWeight: '800',
    paddingVertical: 15,
    fontSize: 16,
  },
  darkTextTitle: {
    fontWeight: 'bold',
    paddingVertical: 15,
    fontSize: 20,
  },
  chartContainer: {
    marginLeft: 15,
    marginTop: 15,
  },
  textt: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10, // Add some space between the texts
  },
});
