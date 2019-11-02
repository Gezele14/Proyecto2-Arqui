import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import Chart from "../screens/Chart";
import Main from "../screens/Main"
import Home from "../screens/Home";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: Home,
    Chart: Chart,
    Main: Main
  },
  {
    defaultNavigationOptions: {
      backgroundColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal"
      }
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

HomeStack.path = "";

export default HomeStack;
