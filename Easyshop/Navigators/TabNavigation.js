import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeNavigator } from './StackNavigation';
import CartNavigator from './CardNavigator';
import { useSelector } from 'react-redux';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const cartitem = useSelector((state) => state.cart.cartitem);
  const userrole = useSelector((state) => state.user.userdata)
  console.log("for userrole", userrole)
  const [count, setcount] = useState('')
  useEffect(() => {
    console.log(cartitem)
    setcount(count)
  }, [cartitem])
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }
          else if (route.name === 'ShoppingCart') {
            iconName = focused
              ? 'cart-sharp'
              : 'cart-outline';
          }
          else if (route.name === 'Admin') {
            iconName = focused
              ? 'cog'
              : 'cog-outline';
          }

          else if (route.name === 'User') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },


        tabBarBadge: route.name == 'ShoppingCart' ? cartitem.length : null,
        tabBarBadgeStyle: { backgroundColor: cartitem.length > 0 ? 'red' : 'transparent' },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="ShoppingCart" component={CartNavigator} />
      {userrole.isAdmin === true ?
        <>
          <Tab.Screen name="Admin" component={AdminNavigator} />
        </>
        : null
      }

      <Tab.Screen name="User" component={UserNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})