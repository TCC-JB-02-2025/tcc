import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SearchBar({value, onChangeText, placeholder}) {

  return (
      <View style={styles.container}>
        <FontAwesome name="search" size={24} color="black" style={styles.icon} />
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
    marginLeft: 13
  },

  input: {
    fontSize: 24,
  },

});
