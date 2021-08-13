import React, { useState } from 'react';
import { View, Image, ImageBackground, StyleSheet, Text, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';


//Main function
export default function RegisterMechanic({ route, navigation }) {

  const [name, setName] = useState("");

  const { token } = route.params;
  const { username } = route.params;

  function register_mechanic() {

    if (!name) {
      alert('Please enter the name of the mechanic');
      return;
    }


    fetch('https://garagethesis.herokuapp.com/staff?name=' + name, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,// + token,
      },
      body: JSON.stringify({
        name: name,

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
        } else {
          alert(text);
        }

      })
      .catch(error => {
        console.error(error);
      });
  }



  return (
    //definition of styles

    <ImageBackground style={styles.container} source={require('../assets/fondo.png')}>

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
        }}>
        Insert the name of the new mechanic.
      </Text>

      <Image style={styles.image} source={require('../assets/mechanic.png')} />

      <View>
        <Mytextinput
          placeholder="Enter the mechanic's name"
          onChangeText={(name) => setName(name)}
        />
      </View>

      <Mybutton title="Submit" customClick={register_mechanic} />

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