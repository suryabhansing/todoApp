import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: Colors.purple,
        }}
        initialRouteName="TaskListScreen">
        <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
