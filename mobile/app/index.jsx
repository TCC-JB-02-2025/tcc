import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';


import SearchBar from "./../components/SearchBar"
import BusLineCard from "./../components/BusLineCard"

function SheetPreview(){
  return (
    <>
      <Text style={{textAlign: "center",fontSize:24, marginBottom: 24}}> Ola, Nome</Text>

      <BusLineCard name="Giraldi 2246" time="5h45"/>
      <BusLineCard name="Giraldi 4355" time="14h40"/>
    </>
  )
}

function SheetFull(){
  const [searchValue, setSearchValue] = useState("")

  return (
    <>
	<Text>nigga</Text>
      <SearchBar
        value={searchValue}
        onChangeText={setSearchValue}
      />
    </>
  )
}

export default function IndexScreen() {
  const snapPoints = ["40%","100%"]
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0) //Começa no primeiro ponto
  const bottomSheetModalRef = useRef(null);

  const handleBottomSheetChanges = useCallback((index) => {
    setBottomSheetIndex(index);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderContent = () => {
    switch (bottomSheetIndex) {
      case 0:
        return <SheetPreview />

      case 1:
        return <SheetFull />

      default:
        return null
    }
  }
  return (
      <View style={styles.container}>
        <Button
          title="Botao"
          onPress={openBottomSheet}
          >

        </Button>
        <BottomSheetModal
          enablePanDownToClose={false}
          index={1}
          snapPoints={snapPoints} 
          onChange={handleBottomSheetChanges}
          ref={bottomSheetModalRef}
          >
          <BottomSheetView style={styles.contentContainer}>
            {renderContent()}
          </BottomSheetView>
		  	</BottomSheetModal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },



  contentContainer: {
    width: "100%",
    height: "100%",
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20
	}

});
