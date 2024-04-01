import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, Get_Product_URL } from '../../actions/type';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';
import { FlatList } from 'react-native';
import Listitem from './Listitem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';


const listitemHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.Headeritem}></View>
      <View style={styles.Headeritem}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Brand</Text>
      </View>
      <View style={styles.Headeritem}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>nam</Text>
      </View>
      <View style={styles.Headeritem}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Category</Text>
      </View>
      <View style={styles.Headeritem}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Price</Text>
      </View>
    </View>
  )
}
const Product = () => {
  const [productlist, setproductlist] = useState([])
  const [productfilter, setProductfilter] = useState();
  const [loading, setloading] = useState(true)
  const [token, settoken] = useState('')
  const [search, setsearch] = useState('')
  let navigate = useNavigation();

  let focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      GetProductData();
    }
    return () => {
      setproductlist([])
      setProductfilter([])
      setloading(true)
    }
  }, [focus])

  const GetProductData = async () => {
    const url = API_URL + Get_Product_URL;
    const res = await axios.get(url)
    if (res.data) {
      console.log(res.data.length)
      setproductlist(res.data)
      setProductfilter(res.data)
      setloading(false)
    }
  }


  const deleteitem = async (id) => {

    const url = API_URL + Get_Product_URL;
    const token = await AsyncStorage.getItem('token')
    console.log("token", token)
    const res = await axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(res.data)
    if (res.data.status == true) {
      showMessage({
        type: 'success',
        message: res.data.msg
      })
      GetProductData();
    }

  }
  const handlesearchtext = (text) => {
    if (text) {
      const data = productlist.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
      setProductfilter(data)
      setsearch(text)
    }
    else {
      console.log(productlist.length)
      setproductlist(productlist)
      setsearch(text)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => navigate.navigate('Order')} style={styles.samebutton}>
          <Text style={styles.sameText}>Orders</Text>
        </Pressable >
        <Pressable onPress={() => navigate.navigate('ProductForm',{type:'Add'})} style={styles.samebutton}>
          <Text style={styles.sameText}>Products</Text>
        </Pressable>
        <Pressable onPress={() => navigate.navigate('Categories')} style={styles.samebutton}>
          <Text style={styles.sameText}>Categories</Text>
        </Pressable>
      </View>
      <SearchBar
        value={search}
        containerStyle={styles.containerStyle}
        placeholder="Search Here..."
        lightTheme={true}
        onChangeText={(e) => handlesearchtext(e)}
        inputStyle={styles.inutstyle}
        inputContainerStyle={styles.inputContainerStyle}
      />
      {
        loading ? (
          <View style={styles.contentwait}>
            <ActivityIndicator size={30} color={'black'} />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={listitemHeader}
            data={productfilter}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Listitem item={item} deleteitem={deleteitem} index={index} />
            )}
          />
        )
      }
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  samebutton: { backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20 },
  sameText:{color:'white',fontSize:15},
  row: { flexDirection: 'row', marginVertical: 20, paddingHorizontal: 20, justifyContent: 'space-between' , marginHorizontal:10 },

  contentwait: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerStyle: {
    backgroundColor: 'white',
    padding: 8,
    borderBlockColor: 'white',
    marginVertical: 5
  },
  inputContainerStyle: {
    color: 'black',
    paddingHorizontal: 8,
    borderRadius: 30
  },
  inutstyle: {
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro'
  },
  Headeritem: {
    width: Dimensions.get('screen').width / 5,
    margin: 3,
  }
})