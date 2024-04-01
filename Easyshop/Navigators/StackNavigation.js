import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SIngleProduct';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ProductContainer" screenOptions={{headerShown:false}}>
      <Stack.Screen name='ProductContainer'  component={ProductContainer} />
      <Stack.Screen name='Product Details' component={SingleProduct} />
    </Stack.Navigator>
  )
}




export const HomeNavigator = () => {
  return (
    <StackNavigation />
  )
}
