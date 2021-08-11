import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from "react-native";

// Home admin page
export default function HomeAdmin({ route, navigation }) {
  //parameters sent from the login page.
  const { token } = route.params;
  const { username } = route.params;
 
  return (
     
    <ImageBackground style={styles.container} source={require('../assets/fondo.png')}> 
      <Text 
       style={{
              marginTop: 25,
              marginLeft: 35,
              fontSize: 25,
              textAlign: 'center',
              color: 'brown',
              flex: 1,
              borderColor: 'black',
              fontWeight: 'bold',
              fontFamily: 'Arial',
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
              fontWeight: 'bold',
              marginBottom: 5,

            }}>
           This is Ger's Garage Administrator menu, please select the option that you want to manage.
          </Text>

          <Image style={styles.image} source={require('../assets/circleUser.png')} /> 

      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('RegisterMechanic', { token: token, username: username })}>
        <Text style={styles.text} >Register a mechanic</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('ViewMechanics', { token: token, username: username })}>
        <Text style={styles.text} >View all mechanics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('GetAllBookings', { token: token, username: username })}>
        <Text style={styles.text} >View all bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('GetBookingsPerDay', { token: token, username: username })}>
        <Text style={styles.text} >View bookings per day</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('GetBookingsPerWeek', { token: token, username: username })}>
        <Text style={styles.text} >View bookings per week</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('AddOtherSupplies', { token: token, username: username })}>
        <Text style={styles.text} >Add the supplies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('UpdateStatusOfBookings', { token: token, username: username })}>
        <Text style={styles.text} >Update the status of bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('AssignTasksToStaff', { token: token, username: username })}>
        <Text style={styles.text} >Assign bookings to the staff</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBtn} onPress={() => navigation.navigate('ViewRosterPerDay', { token: token, username: username })}>
        <Text style={styles.text} >View roster per day </Text>
      </TouchableOpacity>

      </ImageBackground>

  );
}

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
