import * as React from 'react';
import { useState } from 'react';
import {  StyleSheet, Text, View, StatusBar, ImageBackground, FlatList, Platform, TouchableOpacity } from 'react-native';
import Mybutton from './components/Mybutton';
//import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

export default function GetBookingsPerDay({ route, navigation }) {

  const { token } = route.params;
  const { username } = route.params;
  const [content, setContent] = useState("");
  // const [selectedDate, setSelectedDate] = useState(new Date());


  
  const [selectedDate, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  };


  function BookingDay() {

    // alerts to say to the user to complete the fields

    if (!selectedDate) {
      alert('Select a date');
      return;
    }

    const convert = (rawDate) => {
      var newdate = moment(rawDate).format('YYYY-MM-DD');
      return newdate;
    }


    fetch('https://garagethesis.herokuapp.com/admin/bookings/day?selectedDate=' + convert(selectedDate), {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + token,
      }, //receives the string

    }).then((response) => response.json())
    .then(data => {
     console.log(data)

     if (data.status == 400) {
      alert(data.message)
     
    } 
    else {
      setContent(data);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

  return (
    <ImageBackground style={styles.container} source={require('../assets/fondo.png')}>

      <StatusBar style="auto" />

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
        }}>
        Find bookings by specific day
      </Text>

      <View style={styles.modelPick}>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
       )}




        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.title}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>



      {/* <DatePicker
        style={{width: 200}}
        date={selectedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => setSelectedDate(date)}
      /> */}

      </View>



      <Mybutton title="Confirm" customClick={BookingDay} />


      <FlatList
        data={content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />
  </ImageBackground>
  );
};


let listItemView = (booking) => {
  return (
    <View
    key={booking.key}
    style={{ backgroundColor: 'seashell', padding: 15, marginTop: 25 }}>
    <View style={{ flexDirection: 'row', }}>
      <Text style={styles.text}> Booking id : </Text>
      <Text style={styles.id}> {booking.id}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Username : </Text>
      <Text style={styles.textJson}>  {booking.user.username}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Phone number : </Text>
      <Text style={styles.textJson}> {booking.detail.phoneNumber}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Email : </Text>
      <Text style={styles.textJson}>  {booking.detail.email}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Vehicle type : </Text>
      <Text style={styles.textJson}> {booking.vehicle.vehicleType}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Vehicle make : </Text>
      <Text style={styles.textJson}>  {booking.vehicle.vehicleMake}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> vehicle Licence : </Text>
      <Text style={styles.textJson}>  {booking.vehicle.vehicleLicence}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Vehicle engine type : </Text>
      <Text style={styles.textJson}>  {booking.vehicle.vehicleEngineType}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Service type : </Text>
      <Text style={styles.textJson}>  {booking.serviceType}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Date : </Text>
      <Text style={styles.textJson}> {moment(booking.date).format('MMMM Do YYYY, h:mm:ss A')}</Text>
    </View>

    <View style={styles.text}>
      <Text style={styles.textTittle}> Additional Supply : </Text>
      {booking.parts.map((part, index) => {
        console.log('==>', part);
        return (<View key={index} style={{ flexDirection: 'row' }}>

            <Text style={styles.textAtribute}> name: <Text style={styles.text1}> {part.name}, </Text> </Text>
            <Text style={styles.textAtribute}> price: <Text style={styles.text1}> {part.price} €</Text> </Text> 
            
            </View>)
      })}
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Cost : </Text>
      <Text style={styles.textJson}> {booking.cost} €</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Status : </Text>
      <Text style={styles.textJson}> {booking.status}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}> Comment : </Text>
      <Text style={styles.textJson}> {booking.comment}</Text>
    </View>
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  goBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "deepskyblue",
  },
  text: {
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // backgroundColor: 'lightgray'
  },
  textJson: {
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  id: {
    color: 'red',
    fontSize: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modelPick: {
    color: '#ffffff',
    borderWidth: 3,
    borderColor: 'chocolate',
    justifyContent: 'space-around',
    marginTop: 15,
    padding: 10,
    marginBottom: 200,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  textTittle: {
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: -10,
  },
  textAtribute: {
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 0,
  },
  text1: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Avenir',
    padding: 10,
    marginLeft: -15,
  },

});


