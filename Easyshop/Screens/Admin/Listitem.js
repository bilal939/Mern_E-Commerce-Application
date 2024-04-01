import { ActivityIndicator, Dimensions, StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Image } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_URL, Get_Product_URL } from '../../actions/type';
const { width } = Dimensions.get('screen');
const Listitem = ({item,deleteitem,index}) => {


  let navigation = useNavigation();
  const [modalvisible, setModalVisible] = useState(false)
  
 
  
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate('Product Details', { item: item })
        }}
        onLongPress={() => {
          setModalVisible(true)
        }}
        style={[styles.container, {
          backgroundColor: index % 2 == 0 ? 'white' : 'gainsboro'
        }]}>
        <Image PlaceholderContent={<ActivityIndicator size={20} color={'black'} />} style={styles.image} source={{ uri: item.image }} resizeMode='contain' />
        <Text style={styles.item}>{item.brand}</Text>
        <Text style={styles.item} ellipsizeMode='tail' numberOfLines={1}>{item.name}</Text>
        <Text style={styles.item} ellipsizeMode='tail' numberOfLines={1}>{item.category.name}</Text>
        <Text style={styles.item}>{item.price}</Text>
      </Pressable>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.modalcontainer}>
          <View style={styles.modalview}>
            <View style={{alignSelf:'flex-end', paddingHorizontal:20}}>
              <Text></Text>
              <Icon onPress={() => setModalVisible(false)} name='close' size={30} color={'black'}/>
            </View>
            {/* <View style={styles.rows}> */}
            <Pressable onPress={() => navigation.navigate('ProductForm',{item:item , type:'edit'})} style={[styles.sameButton,{backgroundColor:'green'}]}>
              <Text style={styles.sametext}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => {
              console.log(item.id)
              deleteitem(item._id)
              setModalVisible(false)
              }} style={[styles.sameButton,{backgroundColor:'red'}]}>
              <Text style={styles.sametext}>Delete</Text>
            </Pressable>
            {/* </View> */}
          </View>
        </View>
      </Modal>
    </>
  )
}

export default Listitem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    padding: 5,
    alignItems: 'center'
  },
  image: {
    width: 50,
    margin: 2,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 10
  },
  item: {
    flexWrap: 'wrap',
    width: width / 5,
    margin: 3,
    color: 'black',
  },
  modalcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalview:{
    // backgroundColor:'red',
    backgroundColor:'white',
    padding:10,
    // alignItems:'center',
    height:Dimensions.get('screen').height / 3,
    width:'80%'
  },
  rows:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:20
  },
  sameButton:{
    width:'50%',
    paddingVertical:20,
    paddingVertical:20,
    alignItems:'center',
    marginVertical:10,
    alignSelf:'center'
    
  },
  sametext:{
    color:'white',
    fontSize:20,

  }
})