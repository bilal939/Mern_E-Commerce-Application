
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, ListItem } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { API_URL, placeorderurl } from '../../actions/type';
import { data } from '../../assets/data/data';

const Confirm = (props) => {
  const userorder = props.route?.params;
  console.log("user  ", userorder)

  const placeorder = async () => {
    console.log(userorder)
    console.log(userorder.finalorder)
    // const url = API_URL + '/orders' + placeorderurl;
    // console.log(url)
    // const res = await axios.post(url,userorder.finalorder.orderitem);
    // console.log("res",res)
  }
  return (
    <View style={styles.container}>

      {
        props.route?.params != undefined ? (
          <ScrollView showsVerticalScrollIndicator={false}  style={{width:'90%'}} contentContainerStyle={styles.scrollviewcontainerstyle}>
            <Text style={styles.title}>Confirm Order</Text>
            <View style={styles.shipcontent}>
              <Text style={styles.title}>Order has shipped To</Text>
              <View style={styles.rowdesign}>
                <Text style={styles.boldtext}>Address1</Text>
                <Text style={styles.lighttext}>{props.route?.params.finalorder.ShippingAddress1}</Text>
              </View>
              <View style={styles.rowdesign}>
                <Text style={styles.boldtext}>Address2</Text>
                <Text style={styles.lighttext}>{props.route?.params.finalorder.ShippingAddress2}</Text>
              </View>
              <View style={styles.rowdesign}>
                <Text style={styles.boldtext}>Phone</Text>
                <Text style={styles.lighttext}>{props.route?.params.finalorder.phone}</Text>
              </View>
              <View style={styles.rowdesign}>
                <Text style={styles.boldtext}>City</Text>
                <Text style={styles.lighttext}>{props.route?.params.finalorder.city}</Text>
              </View>
              <View style={styles.rowdesign}>
                <Text style={styles.boldtext}>Country</Text>
                <Text style={styles.lighttext}>{props.route?.params.finalorder.country}</Text>
              </View>
              <View style={styles.rowdesign}>
                <Text style={styles.boldtext}>Zip Code</Text>
                <Text style={styles.lighttext}>{props.route?.params.finalorder.zip}</Text>
              </View>
            </View>
            <Text style={styles.title}>Your Ordered Items are:</Text>
            <View style={{width:'90%'}}>
            {props.route.params.finalorder?.orderitem.map((item) => {
                return (
                  <ListItem key={item.name} bottomDivider>
                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
              })}
            </View>
            <Pressable onPress={placeorder} style={{height:50,marginVertical:20,backgroundColor:'green',width:'90%',justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'white',fontSize:20}}>Place Order</Text>
            </Pressable>
          </ScrollView>
              
          
        ) : (
          <View style={styles.nofoundview}>
            <Text style={styles.title}>No Product has Been placed yet In your Cart </Text>
            <Text style={[styles.title,{marginVertical:0}]}>Add Product to your cart and Come Back Later</Text>
          </View>
        )
      }

    </View>
  )
}

export default Confirm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
    marginVertical: 20
  },
  shipcontent: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: 20
  },
  rowdesign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  boldtext: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500'
  },
  lighttext: {
    fontSize: 15,
    color: 'black',
    fontWeight: '300'
  },
  scrollviewcontainerstyle:{
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:20
  },
  nofoundview:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  }
})