import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Productcard from './Productcard';
const width = Dimensions.get('screen').width;
const Productlist = (props) => {
 
  const { item } = props;

  return (
   <Pressable onPress={()=>props.navigation.navigate('Product Details',{item:item})}>
      <Productcard {...item}/>
   </Pressable>
  )
}

export default Productlist

const styles = StyleSheet.create({})