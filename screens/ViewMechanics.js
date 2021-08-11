import React, { useState } from 'react';
import { View, FlatList, ScrollView, KeyboardAvoidingView, ImageBackground, StyleSheet, SafeAreaView, Text, } from 'react-native';
import Mybutton from './components/Mybutton';


//Main function
export default function ViewMechanic({ route, navigation }) {

  const [content, setContent] = useState("");
  const { token } = route.params;
  const { username } = route.params;


  function view_mechanic() {


    fetch('http://localhost:8080/staff', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,// + token,
      },

      // receives a json.
    }).then((response) => response.json())
      .then(data => {
        console.log(data)

        setContent(data);

      })
      .catch(error => {
        console.error(error);
      });
  }



  return (
    //definition of styles
    <ImageBackground style={styles.container} source={require('../assets/fondo.png')}>

      <ScrollView keyboardShouldPersistTaps="handled">

        <Text
          style={{
            marginTop: 25,
            fontSize: 18,
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          }}>
          Press the button to see the id and name of the mechanics stored in the Garage
        </Text>

        <Mybutton title="Submit" customClick={view_mechanic} />

      </ScrollView>

      <FlatList
        data={content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />



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

let listItemView = (mechanic) => {
  return (
    <View
      key={mechanic.key}
      style={{ backgroundColor: 'seashell', padding: 20, marginTop: 25 }}>

      <View style={{ flexDirection: 'row', }}>
        <Text style={styles.text}> Mechanic id : </Text>
        <Text style={styles.id}> {mechanic.id}</Text>
      </View>


      <View style={{ flexDirection: 'row', }}>
        <Text style={styles.text}> Name : </Text>
        <Text style={styles.textJson}> {mechanic.name}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});