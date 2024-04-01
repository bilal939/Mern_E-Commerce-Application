import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Image, ListItem } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { ClearCart, deleteFromCart } from '../../cartslice/cartslice';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const Cart = (props) => {
  const cartitem = useSelector((state) => state.cart.cartitem);

  let totalPrice = 0;

  let dispatch = useDispatch();
  
  cartitem.map((item) => {
    return totalPrice += item.price;
  })

 
  let navigation = useNavigation();
  const Handlenavigation = () => {
    navigation.navigate('Checkout')

  }
  return (
    <View style={styles.maincontainer}>
      {
        cartitem.length > 0 ? (
          <>
            <FlatList
              style={{ flex: 1, width: '100%' }}
              data={cartitem}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <ListItem.Swipeable topDivider   containerStyle={{ paddingHorizontal: 20 }} bottomDivider 
                rightContent={() => (
                  <Button
                    title="Delete"
                    onPress={() => dispatch(deleteFromCart(item))}
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%',backgroundColor: 'red' , width:'100%' }}
                  />
                )}
                >

                  <Image source={{ uri: item?.image }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                  <ListItem.Content>
                    <ListItem.Title >{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Title>{item.price}</ListItem.Title>
                </ListItem.Swipeable>
              )}
            />
            <View style={styles.bottomcontainer}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={[styles.nofoundText,{color:'red'}]}>${totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.buttonview}>
                <Button buttonStyle	={styles.samebutton} color="warning" onPress={()=>dispatch(ClearCart())} >Clear</Button>
                <Button buttonStyle	={styles.samebutton} onPress={() => Handlenavigation()} color="success">Checkout</Button>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.nocart}>
            <Text style={styles.nofoundText}>No Product In Your Cart</Text>
            <Text style={styles.nofoundText}>Add Product to Your Cart to get started</Text>
          </View>
        )
      }
    </View>

  )
}


export default Cart;

const styles = StyleSheet.create({
  nocart: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  nofoundText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500'

  },
  maincontainer: {
    flex: 1,
    position: 'relative',
  },
  bottomcontainer: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    flexDirection: 'row',
    left: 0,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonview:{
    flexDirection:'row',gap:5
  },
  samebutton:{
     marginLeft:5,
     paddingHorizontal:20,
    //  borderRadius:20
   }
})