import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Dimensions,
  ImageBackground
} from "react-native";
import { BarChart } from "react-native-chart-kit";

import colors from "../constants/Colors"

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: colors.itemColor,
  backgroundGradientTo: colors.itemColor,
  color: (opacity = 100) => `rgba(0, 41, 21, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 1.5
};

const data = {
  labels: ["Azul", "Rojo", "Verde"],
  datasets: [
    {
      data: [30, 45, 28]
    }
  ]
};

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/back.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.mainWindow}>
          <ScrollView style={styles.ScrollView}>
            <View style={styles.View}>
              <Text style={styles.text}> Cantidad de objetos por color</Text>
            </View>
            <BarChart
              style={styles.graphStyle}
              data={data}
              width={screenWidth}
              height={220}
              withInnerLines={true}
              fromZero={true}
              chartConfig={chartConfig}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

Chart.navigationOptions = {
  title: "Dashboard",
  headerStyle: {
    backgroundColor: colors.headerColor,
    opacity: 80
  }
};

let styles = StyleSheet.create({
  scrollStyles: {
    flex: 1,
    justifyContent: "center"
  },
  mainWindow: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    height: 10,
    alignItems: "center",
    fontSize: 20
  },
  graphStyle: {
    marginVertical: 8,
    marginTop: 25,
    borderRadius: 16
  },
  text: {
    fontSize: 25,
    backgroundColor: colors.itemColor,
    borderRadius: 15,
    padding: 8
  },
  View: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: 10,
    alignItems: "center",
    opacity: 100
  },
  ScrollView: {
    flex: 1,
    
  }
});
