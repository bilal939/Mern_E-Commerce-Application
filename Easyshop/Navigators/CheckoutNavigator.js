import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Checkout from '../Screens/Cart/Checkout';
import Payment from '../Screens/Cart/Payment';
import Confirm from '../Screens/Cart/Confirm';

const Tab = createMaterialTopTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName='shipping'>
        <Tab.Screen name='shipping' component={Checkout}/>
        <Tab.Screen name='Payment' component={Payment}/>
        <Tab.Screen name='Confirm' component={Confirm}/>
    </Tab.Navigator>
  )
}

export default function CheckoutNavigator () {
   return <MyTabs/>
}

const styles = StyleSheet.create({})