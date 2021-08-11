import React, { useState } from 'react';
import { View, Image, ImageBackground, StyleSheet, SafeAreaView, Text, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';


//Main function
export default function RegisterNewUser({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function register_NewUser() {

    if (!username) {
      alert('Please enter the user name');
      return;
    }
    if (!password) {
      alert('Please enter the user name');
      return;
    }

    fetch('https://garagethesis.herokuapp.com/users?username=' + username + '&password=' + password, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })

      // receives a string
    }).then((response) => response.text())
      .then(text => {
        console.log(text)

        if (text.indexOf("timestamp") !== -1) {
          //convert the string into an object.
          var object = JSON.parse(text);
          console.log(object.message);
          alert(object.message);
        }
        else {
          alert(text);
          navigation.navigate('Login');
        }

      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <ImageBackground style={styles.container} source={require('../assets/fondo.png')}>

<Text
        style={{
          marginTop: 20,
          fontSize: 18,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
          marginLeft: 20,
          marginRight: 20,
        }}>
        Provide the following details to create an account in Ger's Garage.
      </Text>

      <Image style={styles.image} source={require('../assets/AddUser.png')} />

      <View>
        <Mytextinput
            style={{outlineWidth: 0}}
          placeholder="Insert your username"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View >
        <Mytextinput
         style={{outlineWidth: 0}}
          placeholder="Insert a Password"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Mybutton title="Submit" customClick={register_NewUser} />

      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
      </Text>

    </ImageBackground>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    height: 150,
  },
});