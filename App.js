import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home'
import Newsfeed from './Pages/Newsfeed';
import Racism from './Pages/Racism';
import ReadFeed from './Pages/ReadFeed';
import Report from './Pages/Report';
import { initializeApp } from 'firebase/app'
import firebaseConfig from './base'
const Stack = createNativeStackNavigator();
initializeApp(firebaseConfig);
// Navigation help : https://reactnative.dev/docs/navigation
const App = () => {
  return (
    <NavigationContainer documentTitle={false}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="Newsfeed"
          component={Newsfeed}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="Racism"
          component={Racism}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="ReadFeed"
          component={ReadFeed}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{ title: 'Welcome', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
