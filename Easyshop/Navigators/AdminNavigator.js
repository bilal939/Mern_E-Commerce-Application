import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Categories from '../Screens/Admin/Categories';
import Product from '../Screens/Admin/Product';
import Order from '../Screens/Admin/Order';
import ProductForm from '../Screens/Admin/ProductForm';
const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Product" screenOptions={{headerShown:false}}>
      <Stack.Screen name='Product'  component={Product} />
      <Stack.Screen name='Order' component={Order} />
      <Stack.Screen name='Categories' component={Categories} />
      <Stack.Screen name='ProductForm' component={ProductForm} />
    </Stack.Navigator>
  )
}

export default AdminNavigator;
