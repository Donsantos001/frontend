import * as React from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
//import 'react-datepicker/dist/react-datepicker.css';



export default function AddOtherSupplies({ route, navigation }) {

  const { token } = route.params;
  const { username } = route.params;


  const [supplies, setSupplies] = useState("");
  const [id, setId] = useState(0);


  function AddSupply() {

    // alerts to say to the user to complete the fields
    if (!supplies) {
      alert('Add the supplies');
      return;
    }
    if (!id) {
      alert('Insert id of the booking');
      return;
    }

    fetch('http://localhost:8080/admin/bookings/addcost?supplies=' + supplies + '&bookingId=' + id, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token,
      },
      body: JSON.stringify({
      })
      // receives a string
    }).then((response) => response.text())
      .then(text => {
        console.log(text)
        if (text.indexOf("timestamp") !== -1) {
          var object = JSON.parse(text);
          if (object.status == 400) {
            if (object.message === 'supply already added to the booking') {
              alert(object.message);
            } else if (object.message === 'Booking does not exist') {
              alert(object.message);
            } else {
              alert('Insert valid Id of a booking');
            }
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
        Add a supply to a booking if it is required
      </Text>

      <View style={styles.viewPick}>
        <Picker
          selectedValue={supplies}
          onValueChange={(itemValue, itemIndex) => setSupplies(itemValue)}
          style={{ marginLeft: 20, marginTop: 10, color: 'black', borderColor: 'chocolate', borderRadius: 52, height: 30, borderWidth: 3 }}>
          <Picker.Item label="Add the supplies" value="" />
          <Picker.Item label="Air-fresheners, Price 2.0 €" value="Air-fresheners" />
          <Picker.Item label="Air Bag Diagnostic, Price 232.0 €" value="Air Bag Diagnostic" />
          <Picker.Item label="Air Conditioning, Price 299.0 €" value="Air Conditioning" />
          <Picker.Item label="Battery, Price 89.0 €" value="Battery" />
          <Picker.Item label="Blinking Lights, Price 59.0 €" value="Blinking Lights" />
          <Picker.Item label="Brakes and Disks Repair, Price 322.0 €" value="Brakes and Disks Repair" />
          <Picker.Item label="Brake Fluid, Price 39.0 €" value="Brake Fluid" />
          <Picker.Item label="Car Cover, Price 89.0 €" value="Car Cover" />
          <Picker.Item label="Car Keys, Price 322.0 €" value="Car Keys" />
          <Picker.Item label="Car Light Renovation, Price 16.0 €" value="Car Lights Renovation" />
          <Picker.Item label="Carpets, Price 29.0 €" value="Carpets" />
          <Picker.Item label="Dashboard Polish and Fragances, Price 15.0 €" value="Audi Q3" />
          <Picker.Item label="Dry, Price 3.0 €" value="Dry" />
          <Picker.Item label="Engine Bay Cleaned, Price 322.0 €" value="Engine Bay Cleaned" />
          <Picker.Item label="Engine Oil, Price 69.0 €" value="Engine Oil" />
          <Picker.Item label="Extinguisher, Price 89.0 €" value="Extinguisher" />
          <Picker.Item label="Full Valet, Rrice 99.0 €" value="Full Valet" />
          <Picker.Item label="Gearshift Cover, Price 14.0 €" value="Gearshift Cover" />
          <Picker.Item label="GPS, Price 59 €" value="GPS" />
          <Picker.Item label="Handwash, Price 12.0 €" value="Handwash" />
          <Picker.Item label="Interior Lights, Price 322.0 €" value="Interior Lights" />
          <Picker.Item label="Interior Vacummed, Price 15.0 €" value="Interior Vacummed" />
          <Picker.Item label="Leather Car, Price 13.0 €" value="Leather Car" />
          <Picker.Item label="Luxury Valet, Price 129.0 €" value="Luxury Valet" />
          <Picker.Item label="Mirror, Price 240 €" value="Mirror" />
          <Picker.Item label="Polarized, Price 229.0 €" value="Polarized" />
          <Picker.Item label="Scratch Remover Ser, Price 29.0 €" value="Scratch Remover Ser" />
          <Picker.Item label="Standar Valet, Price 60.0 €" value="Standar Valet" />
          <Picker.Item label="Suspension Repair, Price 199.0 €" value="Suspension Repair" />
          <Picker.Item label="Shine Ceramic, 32.0 €" value="Shine Ceramic" />
          <Picker.Item label="Seat Cover, Price 29.0 €" value="Seat Cover" />
          <Picker.Item label="Seats and Carpets removed, Price 85.0 €" value="Seats and Carpets removed" />
          <Picker.Item label="Tyre Dressing, Price 2.0 €" value="Tyre Dressing" />
          <Picker.Item label="Tyre Repair, Price 20.0 €" value="Tyre Repair" />
          <Picker.Item label="Undercarriage Wash, Price 6.0 €" value="Undercarriage Wash" />
          <Picker.Item label="Windows Cleaned, Price 6.0 €" value="Windows Cleaned" />
          <Picker.Item label="Windshiel, Pricce 400 €" value="Windshiel" />
          <Picker.Item label="Wheel Balancing, Price 79.0 €" value="Wheel Balancing" />

        </Picker>
      </View>

      <View >
        <Mytextinput
          style={{outlineWidth: 0}}
          placeholder="Insert booking id"
          placeholderTextColor="#003f5c"
          onChangeText={(id) => setId(id)}
        />
      </View>


      <Mybutton title="Confirm" customClick={AddSupply} />

    </ImageBackground>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //  justifyContent: 'center',
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
