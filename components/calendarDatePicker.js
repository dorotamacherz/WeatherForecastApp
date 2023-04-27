import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

function calendarDatePicker(props) {

    const currentDate = new Date();
    const [userStartDate, setUserStartDate] = useState(null);
    const [userEndDate, setUserEndDate] = useState(null);

    const onDateChange = (date, type) => {
        if (type === 'START_DATE') {
            setUserStartDate(new Date(date.toString()));
            return;
        }

        if (type === 'END_DATE') {
            setUserEndDate(new Date(date.toString()));
            return;
        }
    };

    useEffect(() => {
        if (userStartDate !== null && userEndDate !== null) {
            props.setModalVisible(false);
            props.setStartDate(userStartDate);
            props.setEndDate(userEndDate);
        }
    }, [userStartDate, userEndDate])

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.titleStyle}>
            React Native Calendar Picker
            </Text>
            <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={currentDate}
            maxDate={new Date().setDate(currentDate.getDate()+4)}
            weekdays={
                [
                'Mon', 
                'Tue', 
                'Wed', 
                'Thur', 
                'Fri', 
                'Sat', 
                'Sun'
                ]}
            months={[
                'January',
                'Febraury',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]}
            previousTitle="Previous"
            nextTitle="Next"
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#80fffd"
            selectedDayTextColor="#000000"
            scaleFactor={375}
            textStyle={{
                color: '#000000',
            }}
            onDateChange={onDateChange}
            />
        </View>
        </SafeAreaView>
    );
};
export default calendarDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});
