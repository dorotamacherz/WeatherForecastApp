import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, View, Modal, Button, Text } from 'react-native';
import * as Location from 'expo-location';
import WeatherApi from './api/weatherApi';
import WeatherList from './components/weatherList';
import CalendarDatePicker from './components/calendarDatePicker';
import DateToString from './utils/dateUtils';

export default function App() {
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const backgroundImage = require('./assets/background.png');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    requestLocationPermission();
    load(startDate, endDate);
  }, []);

  async function requestLocationPermission() {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          base.setErrorMsg("Permission to access location was denied");
          return;
        } 
    }
    catch (error) {
        base.setErrorMsg(error.message);
    }
   }
  

  async function load(startDate, endDate) {
    try {
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      const { latitude, longitude } = location.coords;
      const weatherApi = new WeatherApi();
      result = await weatherApi.getWeather(latitude, longitude, startDate, endDate);

      setResponse(result);
    } catch (error) {
      setErrorMsg(error);
    }
  }

  let errorText = "Waiting ... \n\n";
  if (errorMsg) {
    errorText = errorMsg;
  } else if (response) {
    errorText = "";
  }

  function DatePicker({visible}) {
    console.log("date picker inside button: " + startDate);
    return (
      <Modal visible={visible} transparent={false} animationType="fade">
        <CalendarDatePicker
          setStartDate={() => setStartDate.bind(this)}
          setEndDate={() => setEndDate.bind(this)} />
        <Button title="Close" onPress={() => {
          setModalVisible(false); 
          console.log("DAY1 " + DateToString(startDate));
          console.log("DAY2: " + DateToString(endDate));
          load(startDate, endDate);        
          }}/>
      </Modal>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Button title="Date" onPress={() => setModalVisible(true)}/>
         <DatePicker
          visible={modalVisible} /> 
        <Text style={styles.baseText}>{errorText}</Text>
        <WeatherList data={response} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flrx:1,
    marginTop: 50
  },
  baseText: {
    fontSize: 20,
  },
  image: {
    flex:1, 
    resizeMode:"cover", 
    justyfyContent:"center",
  },
});