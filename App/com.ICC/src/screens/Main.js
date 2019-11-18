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
import { BarChart } from "react-native-chart-kit";
import init from "react_native_mqtt";

import Container from "../components/Container";
import colors from "../constants/Colors";
import bgimage from "../assets/images/background.png";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#218091",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#218091",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0.9) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 1.5
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client(
      "soldier.cloudmqtt.com",
      32885,
      "webSocket"
    );
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.decodeMessage;

    let options = {
      useSSL: true,
      userName: "bnjrpvae",
      password: "xQTE9il9FMYl",
      onSuccess: this.onConnect,
      onFailure: this.doFail
    };

    let visible = false;

    client.connect(options);

    this.state = {
      client,
      azul: 0,
      rojo: 0,
      verde: 0,
      estado: "Lleno"
    };
  }

  renderContainer(name, value, imageSrc) {
    return <Container value={value} name={name} imageSrc={imageSrc} />;
  }

  onConnect = () => {
    const { client } = this.state;
    console.log("Connected");
    client.subscribe("Mesa1/estado");
  };

  doFail = () => {
    console.log("Failed");
  };

  onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  };

  decodeMessage = (message) => {
    let direction = message._getDestinationName();
    let value = message._getPayloadString().split(",");
    console.log(value);
    let blue = this.state.azul;
    let red = this.state.rojo;
    let green = this.state.verde;

    switch (direction) {
      case "Mesa1/estado":
        if (value == "Azul") {
          blue += 1;
          this.setState({
            azul: blue
          });
        } else if (value === "Rojo") {
          red += 1;
          this.setState({
            rojo: red
          });
        } else if (value === "Verde") {
          green += 1;
          this.setState({
            verde: green
          });
        } else if (value === "Vacio") {
          green += 1;
          this.setState({
            estado: value
          });
        }
        break;
    }
  };

  render() {
    return (
      <ImageBackground source={bgimage} style={styles.backgroundContainer}>
        <ScrollView>
          <View style={styles.container}>
            {this.renderContainer(
              "Estado del tubo:",
              this.state.estado,
              "https://assets.webiconspng.com/uploads/2017/09/Box-PNG-Image-20366.png"
            )}
            <View style={styles.View}>
              <Text style={styles.text}> Cantidad de objetos por color</Text>
            </View>
            <View style={styles.chart}>
              <BarChart
                data={{
                  labels: ["Azul", "Rojo", "Verde"],
                  datasets: [
                    {
                      data: [this.state.azul, this.state.rojo, this.state.verde]
                    }
                  ]
                }}
                width={screenWidth}
                height={220}
                withInnerLines={true}
                fromZero={true}
                chartConfig={chartConfig}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

Main.navigationOptions = {
  title: "Estado del Dispositivo",
  headerStyle: {
    backgroundColor: colors.headerColor,
    opacity: 80
  }
};

let styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  Button: {
    width: 100,
    height: 60,
    flex: 1,
    padding: 5,
    marginTop: 25
  },
  View: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: 40,
    alignItems: "center",
    opacity: 100
  },
  text: {
    fontSize: 25,
    backgroundColor: colors.itemColor,
    borderRadius: 15,
    color: "#FFFFFF",
    padding: 8
  },
  chart: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15
  }
});
