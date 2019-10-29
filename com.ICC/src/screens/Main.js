import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
 
export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  };


  render() {
    return (
      <View style={styles.mainWindow}>
        <View>
          <Text> Esta es la ventana principal</Text>
        </View>
      </View>
    );
  }
}

Main.navigationOptions = {
  title: 'Dashboard'
};

let styles = StyleSheet.create({
  mainWindow : {
    flex : 1,
    justifyContent : 'center',
    flexDirection : 'column',
    alignItems : 'center',
    fontSize : 20
  }
});