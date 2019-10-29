import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Main from '../screens/Main';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Inicio: Main,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';


export default HomeStack;


docker run -d -u root --rm --name jenkins \
    -p 3000:3000 -p 50000:50000 \
    --entrypoint bash \
    jenkins:2.46.2-alpine \
    -c "tail -F /jenkins.log"