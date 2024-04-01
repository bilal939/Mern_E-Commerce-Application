import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const UserNavigator = () => {


  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated)
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName='Login'>
      {
        isAuthenticated ? (
          <Stack.Screen name='UserProfile' component={UserProfile} />

        ) : (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='UserProfile' component={UserProfile} />
          </>
        )
      }

    </Stack.Navigator>
  )
}

export default UserNavigator

const styles = StyleSheet.create({})