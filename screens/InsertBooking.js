import * as React from 'react';
import { useState } from 'react';
// import { Picker } from '@react-native-picker/picker';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, View, StatusBar, ImageBackground, Button, Platform, TouchableOpacity } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

// import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker';
// import DateTimePicker from "react-native-modal-datetime-picker";
import ModalPicker from 'react-native-modal-picker';

import moment from 'moment';



// insert booking function
export default function InsertBooking({ route, navigation }) {

  const { token } = route.params;
  const { username } = route.params;


  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleLicence, setVehicleLicence] = useState("");
  const [vehicleEngineType, setVehicleEngineType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const [time, setTime] = useState("");
  // const [value, onChange] = useState('10:00');


  // const [selectedDate2, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };


  // const formatDate = (date) => {
  //   return `${date.getDate()}/${date.getMonth() +
  //     1}/${date.getFullYear()}`;
  // };

  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false);
  const [selectedDate2, setDate] = useState(new Date());
 
  const showDateTimePicker = () => {
    setisDateTimePickerVisible(true);
  };
 
  const hideDateTimePicker = () => {
    setisDateTimePickerVisible(false);
  };
 
  const handleDatePicked = (date) => {
    setDate(date);
    hideDateTimePicker();
  };





  let index = 0;
  const dataArray = [
      { key: index++, section: true, label: 'Fruits' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, section: true, label: 'Vegetables' },
      { key: index++, label: 'Beets' },
      { key: index++, label: 'Red Peppers' },
      { key: index++, label: 'Radishes' },
      { key: index++, label: 'Radicchio' },
      { key: index++, label: 'Red Onions' },
      { key: index++, label: 'Red Potatoes' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Tomatoes' }
  ];

  index = 0;
  const vehicleTypes = [
    { key: index++, label: 'Car' },
    { key: index++, label: 'Motorbike' },
    { key: index++, label: 'Small van' },
    { key: index++, label: 'Small bus' },
    { key: index++, label: 'Pickup' }
  ];



  function Booking() {

    // alerts to say to the user to complete the fields
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }
    if (!phoneNumber.match("[0-9]+")) {
      alert('Only numbers allowed');
      return;
    }
    if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      alert('the phone number must contain 10 numbers');
      return;
    }
    if (!phoneNumber.startsWith("083") && !phoneNumber.startsWith("084") && !phoneNumber.startsWith("085") && !phoneNumber.startsWith("086") && !phoneNumber.startsWith("087")) {
      alert('the phone number must start with 083, 084, 085, 086, 087');
      return;
    }
    if (!email) {
      alert('Please insert an email');
      return;
    }
    if (email.indexOf("@") === -1) {
      alert('Email must contain the next symbol "@"');
      return;
    }
    if (email.indexOf(".") === -1) {
      alert(' Email must contain the next symbol "."');
      return;
    }


    if (!vehicleType) {
      alert('Select the type of the vehicle');
      return;
    }
    if (!vehicleMake) {
      alert('Select the make of your vehicle');
      return;
    }
    if (!vehicleLicence) {
      alert('Please insert the licence of your vehicle');
      return;
    }
    if (!vehicleEngineType) {
      alert('Select the engine type');
      return;
    }
    if (!serviceType) {
      alert('Select the service that you want');
      return;
    }
    if (!selectedDate) {
      alert('Select a date');
      return;
    }
    if (!time) {
      alert('Select a time');
      return;
    }
    //format time
    const convert = (rawDate) => {
      // var date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(rawDate)
      // var datearray = date.split("/");
      // var newdate = datearray[2] + '-' + datearray[0] + '-' + datearray[1];
      var newdate = moment(rawDate).format('YYYY-MM-DD');
      return newdate;
    }

    // fetch Verb post
    fetch('https://garagethesis.herokuapp.com/booking', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,// + token
      },
      body: JSON.stringify({
        detail: {
          name: username,
          phoneNumber: phoneNumber,
          email: email,
        },
        vehicle: {
          vehicleType: vehicleType,
          vehicleMake: vehicleMake,
          vehicleLicense: vehicleLicence,
          vehicleEngineType: vehicleEngineType,
        },
        serviceType: serviceType,
        date: convert(selectedDate2) + 'T' + time,
        comment: comment,
      }) // receives a string
    }).then((response) => response.text())
      .then(text => {
        console.log(text)

        if (text.indexOf("timestamp") !== -1) {
          //convert the string into an object
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
    // <View style={styles.container}>
    
    <ImageBackground style={styles.container} source={require('../assets/fondo.png')}>
      <StatusBar style="auto" />

      <Text
        style={{
          marginTop: 25,
          fontSize: 20,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: 5,
        }}>
        {username}, please provide your details to store a booking in Ger's Garage.
      </Text>

      <Text 
      style={{
          color: 'black',
          fontWeight: 'bold',
        }}>
        Insert the phone number with the following example</Text>
      <View >
        <Mytextinput
          
          placeholder=" 0830732879  "
          placeholderTextColor="#003f5c"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
      </View>
      <View >
        <Mytextinput
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.viewPick}>

          <ModalPicker
              data={dataArray}
              initValue="Select the type of your vehicle"
              onChange={(option)=>{ setVehicleType(option.value) }} />

          {/* <ModalPicker
              data={dataArray}
              initValue="Select something yummy!"
              onChange={(option)=> setInput(option.label)}>
              
              <TextInput
                  style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                  editable={false}
                  placeholder="Select something yummy!"
                  value={textInputValue} />
                  
          </ModalPicker> */}
      </View>

      {/* <View style={styles.viewPick}>
        <Picker
          selectedValue={vehicleType}
          onValueChange={(itemValue, itemIndex) => setVehicleType(itemValue)}
          style={styles.pick}>
                      <Picker.Item label="Select the type of your vehicle" value="" />
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Motorbike" value="Motorbike" />
          <Picker.Item label="Small van" value="Small van" />
          <Picker.Item label="Small bus" value="Small bus" />
          <Picker.Item label="Pickup" value="Pickup" />
        </Picker>
      </View> */}

      <View style={styles.viewPick}>
        <Picker
          selectedValue={vehicleMake}
          onValueChange={(itemValue, itemIndex) => setVehicleMake(itemValue)}
          style={styles.pick}>
                      <Picker.Item label="Select make of your vehicle" value="" />
          <Picker.Item label="Audi A1" value="Audi A1" />
          <Picker.Item label="Audi A3" value="Audi A3" />
          <Picker.Item label="Audi A4" value="Audi A5" />
          <Picker.Item label="Audi A5" value="Audi A5" />
          <Picker.Item label="Audi A6" value="Audi A6" />
          <Picker.Item label="Audi A7" value="Audi A7" />
          <Picker.Item label="Audi e-tron GT" value="Audi e-tron GT" />
          <Picker.Item label="Audi Q1" value="Audi Q1" />
          <Picker.Item label="Audi Q2" value="Audi Q2" />
          <Picker.Item label="Audi Q3" value="Audi Q3" />
          <Picker.Item label="Audi Q4" value="Audi Q4" />
          <Picker.Item label="Audi Q5" value="Audi Q5" />
          <Picker.Item label="Audi Q6" value="Audi Q6" />
          <Picker.Item label="Audi Q7" value="Audi Q7" />
          <Picker.Item label="Audi Q8" value="Audi Q8" />
          <Picker.Item label="Bmw X2" value="Bmw X2" />
          <Picker.Item label="Bmw X3" value="Bmw X3" />
          <Picker.Item label="Bmw X4" value="Bmw X4" />
          <Picker.Item label="Bmw X5" value="Bmw X5" />
          <Picker.Item label="Bmw X6" value="Bmw X6" />
          <Picker.Item label="Bmw X7" value="Bmw X7" />
          <Picker.Item label="Bmw X8" value="Bmw X8" />
          <Picker.Item label="Bmw Z4" value="Bmw Z4" />
          <Picker.Item label="Bmw I3" value="Bmw I3" />
          <Picker.Item label="Dodge Caliber" value="Dodge Caliber" />
          <Picker.Item label="Dodge Charger" value="Dodge Charger" />
          <Picker.Item label="Dodge Challenger" value="Dodge Challenger" />
          <Picker.Item label="Dodge Ram" value="Dodge Ram" />
          <Picker.Item label="Dodge Durango" value="Dodge Durango" />
          <Picker.Item label="Ford Fiesta" value="Ford Fiesta" />
          <Picker.Item label="Ford EcoSport" value="Ford EcoSport" />
          <Picker.Item label="Ford Focus" value="ford Focus" />
          <Picker.Item label="Ford Mustang" value="Ford Mustang" />
          <Picker.Item label="Hyundai Accent" value="Hyundai Accent" />
          <Picker.Item label="hyundai Elantra" value="Hyundai Elantra" />
          <Picker.Item label="Hyundai Genesis" value="Hyundai Genesis" />
          <Picker.Item label="Hyundai I10" value="Hyundai I10" />
          <Picker.Item label="Hyundai I20" value="hyundai I20" />
          <Picker.Item label="Hyundai I30" value="Hyundai I30" />
          <Picker.Item label="Hyundai I40" value="Hyundai I40" />
          <Picker.Item label="Honda Jazz" value="Honda Jazz" />
          <Picker.Item label="Honda Civic" value="Honda Civic" />
          <Picker.Item label="Honda CR-Z" value="Honda CR-Z" />
          <Picker.Item label="Honda HR-V" value="Honda HR-V" />
          <Picker.Item label="Honda FR-V" value="Honda FR-V" />
          <Picker.Item label="Mazda 2" value="Mazda 2" />
          <Picker.Item label="Mazda 3" value="Mazda 3" />
          <Picker.Item label="Mazda 6" value="Mazda 6" />
          <Picker.Item label="Mazda CX-3" value="Mazda CX-3" />
          <Picker.Item label="Mazda CX-5" value="Mazda CX-5" />
          <Picker.Item label="Mercedes Benz E500" value="Mercedes Benz E500" />
          <Picker.Item label="Mercedes Benz C300" value="Mercedes C300" />
          <Picker.Item label="Mercedes Benz G500" value="Mercedes Benz G500" />
          <Picker.Item label="Mercedes Benz AMG" value="Mercedes Benz AMG" />
          <Picker.Item label="Nissan Juke" value="Nissan Juke" />
          <Picker.Item label="Nissan QashQai" value="Nissan QashQai" />
          <Picker.Item label="Nissan Micra" value="Nissan Micra" />
          <Picker.Item label="Nissan Navara" value="Nissan Navara" />
          <Picker.Item label="Renault Clio" value="Renault Clio" />
          <Picker.Item label="Renault Kangoo" value="Renault Kangoo" />
          <Picker.Item label="Renault Koleos" value="Renault Koleos" />
          <Picker.Item label="Toyota Yaris" value="Toyota Yaris" />
          <Picker.Item label="Toyota Hilux" value="Ford EcoSport" />
          <Picker.Item label="Toyota Auris" value="Toyota Auris" />
          <Picker.Item label="Toyota Corolla" value="Toyota Corolla" />
          <Picker.Item label="Honda Accord" value="Honda Accord" />
          <Picker.Item label="Honda Jazz" value="Honda Jazz" />
          <Picker.Item label="Honda Civic" value="Honda Civic" />
          <Picker.Item label="Honda CR-Z" value="Honda CR-Z" />
          <Picker.Item label="Honda HR-V" value="Honda HR-V" />
          <Picker.Item label="Honda FR-V" value="Honda FR-V" />
          <Picker.Item label="Lexus CT" value="Lexus CT" />
          <Picker.Item label="Lexus GS" value="Lexus GS" />
          <Picker.Item label="Lexus IS" value="Lexus IS" />
          <Picker.Item label="Lexus LS" value="Lexus LS" />
          <Picker.Item label="Lexus NX" value="Lexus NX" />
        </Picker>

      </View>

      <View >
        <Mytextinput
          
          placeholder="Insert the licence of the vehicle"
          placeholderTextColor="#003f5c"
          onChangeText={(vehicleLicence) => setVehicleLicence(vehicleLicence)}
        />
      </View>

      <View style={styles.viewPick}>
        <Picker
          selectedValue={vehicleEngineType}
          onValueChange={(itemValue, itemIndex) => setVehicleEngineType(itemValue)}
          style={styles.pick}>

            <Picker.Item label="Select the engine of the vehicle" value="" />
          <Picker.Item label="Diesel" value="Diesel" />
          <Picker.Item label="Petrol" value="Petrol" />
          <Picker.Item label="Hybrid" value="Hybrid" />
          <Picker.Item label="Electric" value="Electric" />
        </Picker>
      </View>

      <View style={styles.viewPick}>
        <Picker
          selectedValue={serviceType}
          onValueChange={(itemValue, itemIndex) => setServiceType(itemValue)}
          style={styles.pick}>
          <Picker.Item label="Select the type of service" value="" />
          <Picker.Item label="Anual Service, Price 230.90 €" value="Annual Service" />
          <Picker.Item label="Major Service, Price 330.50 €" value="Major Service" />
          <Picker.Item label="Repair, Price 190.00 €" value="Repair" />
          <Picker.Item label="Major Repair, Price 200.00 €" value="Major Repair" />
        </Picker>
      </View>

      {/* <View style={styles.model}>
        <DatePicker selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat='yyyy-MM-dd'
          minDate={new Date()}
          filterDate={date => date.getDay() != 0}
          isClearable
        />
      </View> */}

      
<View style={styles.model}>
        {/* <DatePicker selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat='yyyy/MM/dd'
          filterDate={date => date.getDay() != 0}
          isClearable
        /> */}
        {/* <DatePicker
        style={{width: 200}}
        date={selectedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2017-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => setSelectedDate(date)}
      /> */}
      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View> */}
      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate2}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
       )}




        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.title}>{formatDate(selectedDate2)}</Text>
        </TouchableOpacity> */}




        <Button title="Show DatePicker" onPress={showDateTimePicker} />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />




      {/* <DatePicker
        style={{width: 200}}
        date={selectedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => setSelectedDate(date)}
      /> */}

      </View>


      <View style={styles.model}>
        <Picker
          selectedValue={time}
          onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
          style={styles.pick}>
          <Picker.Item label="Select the time" value="" />
          <Picker.Item label="10:00 AM" value="09:00:00" />
          <Picker.Item label="12:00 PM" value="11:00:00" />
          <Picker.Item label="15:00 PM" value="14:00:00" />
          <Picker.Item label="17:00 PM" value="16:00:00" />
        </Picker>
      </View>

      <View >
        <Mytextinput
          placeholder="Add comment if you need"
          placeholderTextColor="#003f5c"
          onChangeText={(comment) => setComment(comment)}
        />
      </View>

      <Mybutton title="Confirm" customClick={Booking} />

    </ImageBackground>

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
    color: '#ffffff',
  },
  model: {
    color: '#ffffff',
    borderWidth: 3,
    borderColor: 'chocolate',
    justifyContent: 'space-around',
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 35
  },
  modelPick: {
    color: '#ffffff',
    borderWidth: 3,
    borderColor: 'chocolate',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 200,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  inputView1: {
    marginTop: 10
  },

  viewPick: {
    color: '#ffffff',
    borderWidth: 3,
    marginLeft: 20,
    marginTop: 10, 
    marginRight: 35,
    color: 'black', 
    borderColor: 'chocolate', 
    borderRadius: 50,
    backgroundColor: 'white',
  },
  
  pick: {
     height: 30, 
     width: 200, 
     color: 'black' 
  }
});
