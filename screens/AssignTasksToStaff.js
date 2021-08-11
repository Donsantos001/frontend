import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';


export default function AssingnTaksToStaff({ route, navigation }) {

    const [staffId, setStaffId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const { token } = route.params;
    const { username } = route.params;


    function AssignTasks() {

        if (!staffId) {
            alert('Insert the id of the mechanic');
            return;
        }
        if (!bookingId) {
            alert('Insert id of the booking');
            return;
        }

        fetch('http://localhost:8080/admin/bookings/staff?staffId=' + staffId + '&bookingId=' + bookingId, {
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
               // alert(text)
               

                if (text.indexOf("timestamp") !== -1) {
                    var object = JSON.parse(text);
                if (object.status == 400) {
                    if (object.message === 'Booking already assigned to the staff') {
                        alert(object.message);
                    } else if (object.message === 'Staff has reached his maximum capacity for this day') {
                         alert(object.message);
                    } else {
                        alert('Insert valid Id of a booking or mechanic');
                    }
                } else if (object.status == 500) {
                    alert('The id of the booking or id of the mecanic does not exist')
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
                Insert the Id of the booking and Id of the mechanic to create the roster.
            </Text>

            <View >
                <Mytextinput
                    style={{outlineWidth: 0}}
                    placeholder="Enter the id of the mechanic"
                    placeholderTextColor="#003f5c"
                    onChangeText={(staffId) => setStaffId(staffId)}
                />
            </View>

            <View>
                <Mytextinput
                    style={{outlineWidth: 0}}
                    placeholder="Insert the id of the booking"
                    placeholderTextColor="#003f5c"
                    onChangeText={(bookingId) => setBookingId(bookingId)}
                />
            </View>


            <Mybutton title="Get all bookings" customClick={AssignTasks} />

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
