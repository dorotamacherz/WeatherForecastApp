import { Text, View, StyleSheet } from 'react-native';


const weatherItem = function({item}) {

    return (
        <View style={styles.container}>
            <Text style={styles.boldText}>{item.dateOfDay}</Text>
            <Text style={styles.baseText}>Max temperature: {item.temperatureMax} °C</Text>
            <Text style={styles.baseText}>Min temperature: {item.tempreatureMin} °C</Text>
            <Text style={styles.baseText}>Max Feels like: {item.apparentTemperatureMax} °C</Text>
            <Text style={styles.baseText}>Min Feels like: {item.apparentTempreatureMin} °C</Text>
            <Text style={styles.baseText}>Sum of daily precipitation: {item.precipitationSum} mm</Text>
            <Text style={styles.baseText}>Sum of daily rain: {item.rainSum} mm</Text>
            <Text style={styles.baseText}>Sum of daily showers: {item.showersSum} mm</Text>
            <Text style={styles.baseText}>Sum of daily snowfall: {item.snowfallSum} mm</Text>
            <Text style={styles.baseText}>Maximum wind speed: {item.windspeedMax} km/h</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(220, 240, 240, 0.8)',
    },
    baseText: {
      fontSize: 22,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 24,
      },
  });

export default weatherItem;