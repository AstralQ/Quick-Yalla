// App.js
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigations/StackNavigator';
import DrawerNavigator from './navigations/DrawerNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      {/* <DrawerNavigator/> */}
    </NavigationContainer>
  );
};

export default App;
