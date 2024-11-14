import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/Login';  // This screen isn't used in the current DrawerNavigator
import SettingsScreen from '../screens/SettingsScreen';  // Assuming a settings screen exists
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="YallaApp">
      {/* Home screen is shown first in the drawer */}
      <Drawer.Screen
        name="YallaApp"
        component={SearchScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ focused, size }) => (
            <Icon name="search" size={size} color={focused ? '#7cc' : '#ccc'} />
          ),
          headerShown: true,  // Header is shown for SearchScreen
        }}
      />
      {/* Settings screen is shown last in the drawer */}
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ focused, size }) => (
            <Icon name="cogs" size={size} color={focused ? '#7cc' : '#ccc'} />
          ),
          headerShown: false,  // Header is hidden for SettingsScreen
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
