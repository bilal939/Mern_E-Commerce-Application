import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@rneui/themed';
import { logoutuser } from '../../userslice/userslice';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const userdata = useSelector((state) => state.user.userdata);
  let navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.email}>{userdata.email}</Text>
      <Button buttonStyle={styles.Button} title={'Sign Out'} onPress={() => {
        logoutuser()
        setTimeout(() => {
        navigate.navigate('Login')
          
        }, 5000);
        }}/>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  email:{
    fontSize:20,
    marginVertical:10,
    fontWeight:'900'
  },
  Button: {
    marginVertical: 20
},
})