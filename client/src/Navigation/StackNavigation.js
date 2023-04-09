import React from 'react';
import {

} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FoodBottomTabs'>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackNavigation;