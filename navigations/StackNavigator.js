// src/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import SearchScreen from '../screens/SearchScreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="create-account" component={SignUpScreen} />
      {/* <Stack.Screen name="SearchScreen" component={SearchScreen} /> */}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
