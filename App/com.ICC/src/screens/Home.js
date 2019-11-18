import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ImageBackground
} from "react-native";

import ListItem from "../ListItem";
import Colors from "../constants/Colors";
import bgimage from "../assets/images/background.png";

export default class Home extends React.Component {
  state = {};

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground source={bgimage} style={styles.backgroundContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}> Selector de objetos por color </Text>
          </View>
          <View style = {styles.FlatListContainer}>
            <FlatList
              numColumns={2}
              data={[require("../assets/images/start.png")]}
              renderItem={({ item }) => {
                return (
                  <ListItem image={item} navigation={this.props.navigation} />
                );
              }}
              keyExtractor={(index) => {
                return index;
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center"
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    fontSize: 30,
    color: "#FFFFFF",
    justifyContent: "center",
    padding: 8
  },
  textContainer: {
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.itemColor,
    borderRadius: 15
  },
  FlatListContainer: {
    marginTop: 50
  }

});
