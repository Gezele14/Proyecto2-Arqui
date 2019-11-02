import React from "react";
import { View, Text, Image, StyleSheet,Dimensions } from "react-native";

const Container = (props) => (
  <View style={styles.container}>
    <Image style={styles.imageStyle} source={{ uri: props.imageSrc }} />
    <View>
      <Text style = {styles.textStyle}>{props.name}</Text>
      <Text style = {styles.textStyle}>{"Estado: " + props.value}</Text>
    </View>
  </View>
);

let styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#000",
    marginTop: -2,
    flexDirection: "row"
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
  },
  textTitleStyle: {
    fontSize: 20,
    marginTop: 10
  },
  textStyle: {
    justifyContent: "center",
    fontSize: 20
  },
  imageStyle: {
    width: 80,
    height: 90,
    marginRight: 20,
    marginLeft: 40
  }
});

export default Container;
