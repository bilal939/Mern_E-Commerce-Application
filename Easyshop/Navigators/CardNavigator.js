import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../Screens/Cart/Cart';
import CheckoutNavigator from './CheckoutNavigator';
const Stack = createStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Cart" screenOptions={{headerShown:false}}>
      <Stack.Screen name='Cart'  component={Cart} />
      <Stack.Screen name='Checkout' component={CheckoutNavigator} />
    </Stack.Navigator>
  )
}

export default CartNavigator;
