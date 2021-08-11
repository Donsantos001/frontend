import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';
import { Picker } from '@react-native-picker/picker';

export default function UpdateStatusOfBookings({ route, navigation }) {

  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const { token } = route.params;
  const { username } = route.params;


  function UpdateStatus() {

    if (!status) {
      alert('Select a status of the booking');
      return;
    }
    if (!id) {
      alert('Insert id of the booking');
      return;
    }

    fetch('http://localhost:8080/admin/bookings/update?status=' + status + '&id=' + id, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + token,
      }, //receives the string
    }).then((response) => response.text())
      .then(text => {
        console.log(text)

        if (text.indexOf("timestamp") !== -1) {
          var object = JSON.parse(text);
          if (object.status == 400) {
            if (object.message === 'Status already update') {
              alert(object.message);
            } else if (object.message === 'Booking does not exist') {
              alert(object.message);
            } else {
              alert('Insert valid Id of a booking ');
            }
          } else if (object.status == 500) {
            alert('The id of the booking does not exist')
          }

        }
        else {
          alert(text);
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
        }}>
        Update the status of a booking.
      </Text>

      <View>
        <Mytextinput
          style={{outlineWidth: 0}}
          placeholder="Insert the id of the booking"
          placeholderTextColor="transparent"
          onChangeText={(id) => setId(id)}
        />
      </View>


      <View style={styles.viewPick}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
          style={{ marginLeft: 20, marginTop: 10, color: 'black', borderColor: 'chocolate', borderRadius: 52, height: 30, borderWidth: 3 }}>
          <Picker.Item label="Update the status of the booking" value="" />
          <Picker.Item label="In service" value="In service" />
          <Picker.Item label="Completed" value="Completed" />
          <Picker.Item label="Collected" value="Collected" />
          <Picker.Item label="Unrepairable" value="Unrepairable" />

        </Picker>
      </View>

      <Mybutton title="Update" customClick={UpdateStatus} />


    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
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
    color: '#ffffff',
  },


});
