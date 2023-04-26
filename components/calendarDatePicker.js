import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

function calendarDatePicker({setStartDate, setEndDate}) {

    let currentDate = new Date();

    const onDateChange = (date, type) => {
        console.log(date.toString());
        console.log(type.toString());
        if (type === 'END_DATE') {
            setEndDate(date);

        } else {
            setEndDate(null);
            setStartDate(date);

        }
    };

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
            {/* <View style={styles.textStyle}>
            <Text style={styles.textStyle}>
                Selected Start Date :
            </Text>
            <Text style={styles.textStyle}>
                {startDate ? startDate : ''}
            </Text>
            <Text style={styles.textStyle}>
                Selected End Date :
            </Text>
            <Text style={styles.textStyle}>
                {endDate ? endDate : ''}
            </Text>
            </View> */}
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
