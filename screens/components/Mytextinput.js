// Custom TextInput

import React from 'react';
import { View, TextInput, PlatformColor, StyleSheet, } from 'react-native';


const Mytextinput = (props) => {
  return (
    <View
      style={{
        marginLeft: 20,
        marginRight: 35,
        marginTop: 10,
        borderColor: 'chocolate',
        borderWidth: 3,
        borderRadius: 50,
        width: 200,
        height: 30,
        backgroundColor: 'white',
        paddingLeft: 7, 
      }}>
      <TextInput
        //className= 
         style={{
          backgroundColor: "red",
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
         }}


         underlineColorAndroid="transparent"
         placeholder={props.placeholder}
         placeholderTextColor="black"
         keyboardType={props.keyboardType}
         onChangeText={props.onChangeText}
         returnKeyType={props.returnKeyType}
         numberOfLines={props.numberOfLines}
         multiline={props.multiline}
         onSubmitEditing={props.onSubmitEditing}
         style={props.style}
         blurOnSubmit={false}
         value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "red",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


export default Mytextinput;