import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";

export default function HomeUser({ route, navigation }) {
  //parameters sent from the login page.
  const { token } = route.params;
  const { username } = route.params;
  //buttons to navigate in the pages. 
  return (

       <ImageBackground style={styles.container} source={require('../assets/fondo.png')}> 
       <Text 
       style={{
              marginTop: 25,
              marginLeft: 35,
              fontSize: 25,
              textAlign: 'center',
              color: 'brown',
             // backgroundColor: 'palevioletred',
              flex: 1,
              borderColor: 'black',
              fontWeight: 'bold',
              //fontFamily: 'Lobster',
              fontFamily: 'Roboto',
              fontSize: 30
             
            }}>
         Hello {username}. Welcome
         </Text>

      <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              textAlign: 'center',
              color: 'black',
             // backgroundColor: 'lavenderblush',
              fontWeight: 'bold',
              marginBottom: 5,

            }}>
           This is Ger's Garage menu, please select the option that you want.
          </Text>

          <Image style={styles.image} source={require('../assets/circleUser.png')} /> 

      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('InsertBooking', { token: token, username: username })}>
        <Text style={styles.text} >Insert booking</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('ViewBookingsUser', { token: token, username: username })}>
        <Text style={styles.text} >View all your bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('GetInvoice', { token: token, username: username })}>
        <Text style={styles.text} >Print invoice</Text>
      </TouchableOpacity>

       </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#fff',
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
    backgroundColor: "orangered",
  },
  text: {
    color: '#ffffff',
  },
  image: {
    marginBottom: -30,
    width: 150,
    height: 150,
  },


});
