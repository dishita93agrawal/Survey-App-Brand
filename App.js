import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/appStackNavigator';
import firebase from 'firebase';
import db from './config' 
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}; 
export default App;
