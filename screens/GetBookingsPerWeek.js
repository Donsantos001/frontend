import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, ImageBackground, Platform } from 'react-native';
import Mybutton from './components/Mybutton';
import DatePicker from 'react-native-datepicker';
import Mytextinput from './components/Mytextinput';
import moment from 'moment';

export default function GetBookingsPerWeek({ route, navigation }) {

  const [week, setWeek] = useState(0);
 // const [year, setYear] = useState(0);
  const [content, setContent] = useState("");
  const { token } = route.params;
  const { username } = route.params;

  function bookingsWeek() {

    if (!week) {
      alert('Insert the number of the week');
      return;
    }

    //   if (!year) {
    //     alert('Insert a year');
    //     return;
    // }


    fetch('https://garagethesis.herokuapp.com/admin/bookings/week?week=' + week, {
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

        if (data.length === 0) {
          alert("No bookings made for this week");
        }
        if (data.status === 400) {
          if (data.message === 'No bookings registered for this week') {
            alert(data.message);
          } else if (data.message === 'Invalid Week') {
            alert(data.message)
          } else {
            alert('Insert a valid number of a week');
          }

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
        Find bookings by specific week, Remeber that the year has 52 weeks.
      </Text>

      <View >
        <Mytextinput
          placeholder="number of the week"
          placeholderTextColor="#003f5c"
          onChangeText={(week) => setWeek(week)}
        />
      </View>

      <Mybutton title="Get all bookings" customClick={bookingsWeek} />

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
    fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'sans-serif',
    padding: 10,
    marginLeft: -15,
  },

});
