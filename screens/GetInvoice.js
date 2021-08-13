import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';


export default function getInvoice({ route, navigation }) {

  const { token } = route.params;
  const { username } = route.params;
  const [content, setContent] = useState("");



  function Receipt() {

    fetch('https://garagethesis.herokuapp.com/admin/bookings/invoice?username=' + username, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + token,
      }, 
      //receives the response in json format
    }).then((response) => response.json())
      .then(data => {
        console.log(data)
        if (data.length === 0) {
          alert("No invoices ready at this time");
        }
        // stores the data in a variable
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
            marginTop: 25,
            fontSize: 18,
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          }}>
          {username}, to see the invoice, the status of the booking has to be completed. Press the button to check.
        </Text>

        <Mybutton title="Get invoice" customClick={Receipt} />

        <FlatList
          data={content}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </ImageBackground>
  );
};

let listItemView = (invoice) => {
  return (
    <View
      key={invoice.key}
      style={{ backgroundColor: 'seashell', padding: 20, marginTop: 25 }}>
      {/* <Text> Invoice : {receipt.json}</Text>  */}

      <View style={{ flexDirection: 'row', }}>
        <Text style={styles.text}> Booking id : </Text>
        <Text style={styles.id}> {invoice.bookingId}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Phone number : </Text>
        <Text style={styles.textJson}> {invoice.phoneNumber}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Email : </Text>
        <Text style={styles.textJson}>  {invoice.email}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Service type : </Text>
        <Text style={styles.textJson}> {invoice.serviceType}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Vehicle make : </Text>
        <Text style={styles.textJson}>  {invoice.vehicleMake}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> vehicle licence : </Text>
        <Text style={styles.textJson}>  {invoice.vehicleLicence}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Service type : </Text>
        <Text style={styles.textJson}>  {invoice.serviceType}</Text>
      </View>

      <View style={styles.text}>
        <Text style={styles.textTittle}> Additional Supply : </Text>
        {invoice.parts.map((part, index) => {
          console.log('==>', part);
          return (<View key={index} style={{ flexDirection: 'row' }}>

            <Text style={styles.textAtribute}> name: </Text> <Text style={styles.text1}> {part.name}, </Text>
            <Text style={styles.textAtribute}> price: </Text> <Text style={styles.text1}> {part.price} €</Text></View>)
        })}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Status : </Text>
        <Text style={styles.textJson}> {invoice.status}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Total : </Text>
        <Text style={styles.textJson}> {invoice.total} €</Text>
      </View>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#fff',
    alignItems: 'center',
  //  justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // backgroundColor: 'lightgray'
  },
  textJson: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'sans-serif-medium',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // backgroundColor: 'orangered'
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
  textAtribute: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 0,
  },
  textTittle: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: -10,
  },

});
