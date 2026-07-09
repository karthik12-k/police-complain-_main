import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ComplaintFormScreen from './src/screens/ComplaintFormScreen';
import NearbyPoliceScreen from './src/screens/NearbyPoliceScreen';
import PoliceLoginScreen from './src/screens/PoliceLoginScreen';
import PoliceSignupScreen from './src/screens/PoliceSignupScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ComplaintForm" component={ComplaintFormScreen} options={{ title: 'File Complaint' }} />
        <Stack.Screen name="NearbyPolice" component={NearbyPoliceScreen} options={{ title: 'Nearby Police' }} />
        <Stack.Screen name="PoliceLogin" component={PoliceLoginScreen} options={{ title: 'Police Login' }} />
        <Stack.Screen name="PoliceSignup" component={PoliceSignupScreen} options={{ title: 'Police Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
