import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, ActivityIndicator, Modal, Button, Text } from 'react-native';
import * as Location from 'expo-location';
import WeatherApi from './api/weatherApi';
import WeatherList from './components/weatherList';
import CalendarDatePicker from './components/calendarDatePicker';

export default function App() {
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const backgroundImage = require('./assets/background.png');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const startLoading = () =>  setLoading(true)
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    requestLocationPermission();
    load(startDate, endDate);
  }, []);

  useEffect(() => {
    load(startDate, endDate);
  }, [startDate, endDate]);

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
      startLoading();
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      const { latitude, longitude } = location.coords;
      const weatherApi = new WeatherApi();
      result = await weatherApi.getWeather(latitude, longitude, startDate, endDate);
      stopLoading();
      
      if (result.length > 1) {
        result.pop();
      }

      setResponse(result);
    } catch (error) {
      stopLoading();
      setErrorMsg(error);
    }
  }

  let errorText = "";
  if (errorMsg) {
    errorText = errorMsg;
  } else if (response) {
    errorText = "";
  }

  function DatePicker({visible}) {
    return (
      <Modal visible={visible} transparent={false} animationType="fade">
        <CalendarDatePicker
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setModalVisible={setModalVisible} />
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
        {loading ? (
          <ActivityIndicator color={"#1893F8"}
            visible={loading}
          />
        ) : (
          <>
            <WeatherList data={response} />
          </>
        )}
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
  }
});