import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Mybutton from './components/Mybutton';

// login function
export default function Login({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetch = require('node-fetch')

   //function to validate a user.
  function validUser() {
 
    // alerts 
    if (!username) {
      alert('Please fill the user name');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }

   

  fetch('https://garagethesis.herokuapp.com/login?username=' + username + '&password=' + password)
      
  // receives an string
    .then((response) => response.text())
    .then(text => {
      console.log(text)

      if (text.indexOf("timestamp") !== -1) {
        // convert the string to an object
        var object = JSON.parse(text);
        console.log(object.message);
        alert(object.message);

      } else{
              if (username !== "admin") {
        navigation.navigate('HomeUser', { token: text, username: username });  
              
         } else {
          navigation.navigate('HomeAdmin', { token: text, username: username }); 
         }
      }

     
    })
    .catch(error => {
           console.error(error);
     });
}
  return (
    <View style={styles.container}>
       <Image style={styles.image} source={require('../assets/logoLogin.png')} /> 

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterNewUser')}>
        <Text style={styles.forgot_button}>Don't you have an account? Click here!</Text>
      </TouchableOpacity>

      <Mybutton title="LOGIN" customClick={validUser} />

    </View>
  );
}
// styles constants
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    height: 200,
  },
  inputView: {
    backgroundColor: "mistyrose",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "white"
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});