import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import ListItem from "../ListItem";
import Colors from "../constants/Colors";

export default class Home extends React.Component {
  state = {};

  static navigationOptions = {
    title: "Selector de color",
    headerStyle: {
      backgroundColor: Colors.headerColor,
      textAlign: "center"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style = {{marginTop:25}}>
          <Text style={styles.text}> Welcome </Text>
        </View>
        <FlatList
          numColumns={2}
          data={[require("../assets/images/start.png")]}
          renderItem={({ item }) => {
            return <ListItem image={item} navigation={this.props.navigation} />;
          }}
          keyExtractor={(index) => {
            return index;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 25,
    backgroundColor: Colors.itemColor,
    borderRadius: 15,
    padding: 8
  }
});
