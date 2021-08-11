import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, FlatList } from 'react-native';
import Mybutton from './components/Mybutton';
import moment from 'moment';


export default function GetAllBookings({ route, navigation }) {

  const [content, setContent] = useState("");
  const { token } = route.params;
  const { username } = route.params;

  function AllBookings() {

    fetch('http://localhost:8080/admin/bookings', {
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
          alert("No bookings made at this time");
        }
        setContent(data);

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
        Press click in the button to see all the bookings in Ger's Garage
      </Text>

      <Mybutton title="View of your bookings" customClick={AllBookings} />

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

            <Text style={styles.textAtribute}> name: </Text> <Text style={styles.text1}> {part.name}, </Text>
            <Text style={styles.textAtribute}> price: </Text> <Text style={styles.text1}> {part.price} €</Text></View>)
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
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textJson: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'sans-serif-medium',
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
  text1: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Avenir',
    padding: 10,
    marginLeft: -15,
  },
  textTittle: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: -10,
  },
  textAtribute: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 0,
  },
});
