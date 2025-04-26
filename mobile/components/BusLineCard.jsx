import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function BusLineCard({name, time, origin, destination}) {

  return (
      <View style={styles.container}>
        <View style={styles.leftTexts}>
            <Text style={styles.name}>
                {name}
            </Text>
            {(origin && destination) && (
                <Text style={styles.route}>
                    {origin} to {destination}
                </Text>
            )}
        </View>
        <View style={styles.rightTexts}>
            <Text style={styles.time}>
                {time}
            </Text>
        </View>
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
    
    marginBottom: 16,
  },

  leftTexts:{ //name and route
    flexDirection: "column",
    marginLeft: 13
  },
  rightTexts:{ //name and route
    marginLeft: "auto",
    marginRight: 8
  },

  name:{
    fontSize:24,
    fontWeight: "bold"
  },

  time: {
    fontSize: 24,
  },

  route:{
    fontSize:12,
  }

});
