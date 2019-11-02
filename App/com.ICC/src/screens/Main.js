import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Dimensions,
  ImageBackground,
  Button
} from "react-native";

import Container from "../components/Container";
import colors from "../constants/Colors";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderContainer(name, value, imageSrc) {
    return <Container value={value} name={name} imageSrc={imageSrc} />;
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.renderContainer(
            "Contenedor Rojo",
            "Vacio",
            "https://assets.webiconspng.com/uploads/2017/09/Box-PNG-Image-20366.png"
          )}
          {this.renderContainer(
            "Contenedor Azul",
            "Vacio",
            "https://assets.webiconspng.com/uploads/2017/09/Box-PNG-Image-20366.png"
          )}
          {this.renderContainer(
            "Contenedor Verde",
            "Vacio",
            "https://assets.webiconspng.com/uploads/2017/09/Box-PNG-Image-20366.png"
          )}
          <View style={styles.Button}>
            <Button
              style={styles.Button}
              title="Chart"
              onPress={() => this.props.navigation.navigate("Chart")}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

Main.navigationOptions = {
  title: "Estado de contenedores",
  headerStyle: {
    backgroundColor: colors.headerColor,
    opacity: 80
  }
};

let styles = StyleSheet.create({
  container:{
    width: Dimensions.get("window").width,
    alignItems: 'center'
  },
  Button: {
    width: 100,
    height: 60,
    flex: 1,
    padding: 5,
    marginTop: 25
  }
});
