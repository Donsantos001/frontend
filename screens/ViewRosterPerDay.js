import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Platform, TouchableOpacity } from 'react-native';
import Mybutton from './components/Mybutton';
import DatePicker from 'react-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

//import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default function ViewRosterPerDay({ route, navigation }) {

  const { token } = route.params;
  const { username } = route.params;
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());


  const [selectedDate2, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  };



  function RosterDay() {

    // alerts to say to the user to complete the fields

    if (!selectedDate) {
      alert('Select a date');
      return;
    }

    const convert = (rawDate) => {
      var newdate = moment(rawDate).format('YYYY-MM-DD');
      return newdate;
    }

    fetch('https://garagethesis.herokuapp.com/admin/roster?date=' + convert(selectedDate2), {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + token,
      }, //receives the string
    }).then((response) => response.json())
      .then(data => {

        if (data.status == 400) {
          alert(data.message)

        } else {
          setContent(data);
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
       Select a date to see the roster
      </Text>

      <View style={styles.model}>
      {show && (
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
        </TouchableOpacity>


        {/* <DatePicker selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat='yyyy/MM/dd'
          filterDate={date => date.getDay() != 0}
          isClearable
        /> */}
      </View>



      <Mybutton title="Confirm" customClick={RosterDay} />


      <FlatList
        data={content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />

    </ImageBackground>
  );
};


let listItemView = (booking) => {
  return (

    <View
      key={booking.key}
      style={{ backgroundColor: 'seashell', padding: 15, marginTop: 25 }}>

      <View style={{ flexDirection: 'row', }}>
        <Text style={styles.text}> Booking id : </Text>
        <Text style={styles.id}> {booking.booking.id}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Username : </Text>
        <Text style={styles.textJson}>  {booking.booking.user.username}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Phone number : </Text>
        <Text style={styles.textJson}> {booking.booking.detail.phoneNumber}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Email : </Text>
        <Text style={styles.textJson}>  {booking.booking.detail.email}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Vehicle type : </Text>
        <Text style={styles.textJson}> {booking.booking.vehicle.vehicleType}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Vehicle make : </Text>
        <Text style={styles.textJson}>  {booking.booking.vehicle.vehicleMake}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> vehicle Licence : </Text>
        <Text style={styles.textJson}>  {booking.booking.vehicle.vehicleLicence}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Vehicle engine type : </Text>
        <Text style={styles.textJson}>  {booking.booking.vehicle.vehicleEngineType}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Service type : </Text>
        <Text style={styles.textJson}>  {booking.booking.serviceType}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Date : </Text>
        <Text style={styles.textJson}> {moment(booking.booking.date).format('MMMM Do YYYY, h:mm:ss A')}</Text>
      </View>

      <View style={styles.text}>
        <Text style={styles.textTittle}> Additional Supply : </Text>
        {booking.booking.parts.map((part, index) => {
          console.log('==>', part);
          return (<View key={index} style={{ flexDirection: 'row' }}>

            <Text style={styles.textAtribute}> name: </Text> <Text style={styles.text1}> {part.name}, </Text>
            <Text style={styles.textAtribute}> price: </Text> <Text style={styles.text1}> {part.price} €</Text></View>)
        })}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Cost : </Text>
        <Text style={styles.textJson}> {booking.booking.cost} €</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Status : </Text>
        <Text style={styles.textJson}> {booking.booking.status}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Comment : </Text>
        <Text style={styles.textJson}> {booking.booking.comment}</Text>
      </View>


      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}> Staff : </Text>
        <Text style={styles.textJson}> {booking.staff.name}</Text>
      </View>

    </View>
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
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
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
    fontSize: 17,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  model: {
    // width: "45%",
    color: '#ffffff',
    borderWidth: 3,
    //borderRadius: 25,
    borderColor: 'chocolate',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 200,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 20,
    // alignItems: 35,

  },
  textTittle: {
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: -10,
  },
  textAtribute: {
    color: 'black',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'sans-serif',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 0,
  },
  text1: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Avenir',
    padding: 10,
    marginLeft: -15,
  },

});
