import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SearchBar({value, onChangeText, placeholder}) {
  
  return (
      <View style={styles.container}>
        <Icon name="search" size={32} color="#000" style={styles.icon} />
        <TextInput
          value={value}
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={placeholder || " Pesquisa ..."}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    height: 60,
    backgroundColor: "#EEEEEE",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,

    alignItems: "center",

    marginLeft: "auto",
    marginRight: "auto",
  },

  icon:{
    marginLeft: 13,
  },

  input: {
    fontSize: 24,
    width: "100%",
    height: "100%",

    // borderColor: "#FF0000",
    // borderWidth: 4,
  },

});
