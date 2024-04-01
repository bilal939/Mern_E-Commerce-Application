import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL, Get_Product_URL } from '../../actions/type';
import { useIsFocused, useNavigation } from '@react-navigation/native';
// import ProductContainer from '../Products/ProductContainer';
import FormConatiner from '../../Shared/Form/FormConatiner';
import Input from '../../Shared/Form/Input';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
const ProductForm = (props) => {

  useEffect(() => {
    if(props?.route?.params?.item){
      console.log(props?.route?.params?.item)
      setname(props?.route?.params?.item.name)
      setdesctiption(props?.route?.params?.item.description)
      setimage('http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/logo.png')
      setcategory(props?.route?.params?.item.category.id)
      setprice(props?.route?.params?.item.price.toString())
      setcountinstcok(props?.route?.params?.item.countinStock.toString())
    }
  },[])



  // console.log("catr", props?.route?.params?.item)
  const categories = useSelector((state) => state.category.categorydata)
  const [name, setname] = useState('')
  const [description, setdesctiption] = useState('');
  const [image, setimage] = useState('http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/img/logo.png')
  const [brand, setbrand] = useState('')
  const [price, setprice] = useState('')
  const [countinstock, setcountinstcok] = useState('')
  const [Numreviews, setNumRev] = useState('')
  const[category,setcategory] = useState('')
  const [isfeatured, setisFeatured] = useState(false)
  const [value, setValue] = useState('')
  let navigation = useNavigation();

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };


  const Addproduct = async () => {
    try {
      const data = {
        name: name,
        description: description,
        richDescription: '',
        image: image,
        Images:'',
        brand: brand,
        price: price,
        category: category,
        countinStock: countinstock,
        ratings: '',
        Numreviews: Numreviews,
        isfeatured: false
      }
      console.log("data is",data)
      const token = await AsyncStorage.getItem('token');
      console.log("token is",token)
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      };

      if(props?.route?.params?.type !== 'edit'){
        const url = API_URL + '/product/';
        const res = await axios.post(url,data,config)
        console.log("ress is",res.data)
        if(res.data.status == true) {
          showMessage({
            type:'success',
            message:res.data.msg,
            onHide: () => {
              navigation.goBack()
            },
          })
        }
      }
      else{
          const url = API_URL + '/product/' + props?.route?.params?.item.id;
          console.log(url)
          const res = await axios.put(url,data,config)
          console.log("update respose is",res.data)
          if(res.data.status == 200){
            showMessage({
              type:'success',
              message:res.data.msg,
              onHide: () => {
                navigation.goBack()
              },
            })
          }
          

      }
  
      
    } catch (error) {
      Alert.alert("Error",error)
    }
    

  }

  return (
    <FormConatiner title='Add Product'>
      <Input
        placeholder={"Enter Your Brand Name"}
        value={brand}
        placeholderTextColor={'black'}
        onChangeText={(val) => setbrand(val)}
      />
      <Input
        placeholder={"Enter Your  Name"}
        value={name}
        placeholderTextColor={'black'}
        onChangeText={(val) => setname(val)}
      />
      <Input
        placeholder={"Enter count in stock"}
        value={countinstock}
        placeholderTextColor={'black'}
        onChangeText={(val) => setcountinstcok(val)}
      />
      <Input
        placeholder={"Enter Your Price"}
        value={price}
        placeholderTextColor={'black'}
        onChangeText={(val) => setprice(val)}
      />
      <Input
        placeholder={"Enter Description"}
        value={description}
        placeholderTextColor={'black'}
        onChangeText={(val) => setdesctiption(val)}
      />


      <Dropdown
        mode='modal'
        style={styles.dropdown}
        data={categories}
        renderItem={renderItem}
        placeholder={value === '' ? "Select type" : value}
        placeholderStyle={{ color: 'black' }}
        selectedTextStyle={{ color: 'black' }}
        value={value}
        renderRightIcon={() => (
          <Icon
            style={styles.icon}
            color="black"
            name="chevron-down"
            size={20}
          />
        )}
        onChange={item => {
          console.log("item",item)

          setcategory(item.id)
          setValue(item.name);
        }}
      />
       <Button onPress={Addproduct}  buttonStyle={styles.Button} containerStyle={{ width: '50%' }} color={'success'} titleStyle={styles.title} title={props?.route?.params.type == 'edit' ? 'Update product':'Add Product'} />
    </FormConatiner>
  )
}

export default ProductForm

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    height: 50,
    color: 'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  textItem: {
    color: 'black',
    fontSize: 18,
    marginVertical: 5,

  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10.,
    borderTopColor: 'silver',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  Button: {
    marginVertical: 20
},
title: {
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'capitalize'

},
})