import { StyleSheet, Text, View  , FlatList, Pressable, TextInput, Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL, Get_Cateogry_URL } from '../../actions/type'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import Input from '../../Shared/Form/Input'
import { showMessage } from 'react-native-flash-message'
const Categories = () => {

  const focus = useIsFocused();
  const[categories,setCategories] = useState([])
  const [categoryname,setCategoryName] = useState('')

  useEffect(() => {
    GetAllCategories();
  },[focus])

  const GetAllCategories = async () => {
    const url = API_URL + Get_Cateogry_URL;
    const token = await AsyncStorage.getItem('token')
    console.log("token", token)
    const res = await axios.get(`${url}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(res.data)
    if(res.data){
      setCategories(res.data)
    }
  }


  const handleDelete = async (item) => {
     console.log("item is",item)
     const url = API_URL + Get_Cateogry_URL;
    const token = await AsyncStorage.getItem('token')
    console.log("token", token)
    const res = await axios.delete(`${url}/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log("res",res.data)
    if(res.data){
      showMessage({
        type: 'success',
        message: res.data
      })
      GetAllCategories();
    }
  }

  const AddCategeory = async () => {
    if(!categoryname) return Alert.alert("Error","Category Name should not be Empty");
    console.log("ca",categoryname)
    const url = API_URL + Get_Cateogry_URL;
    let data = {
      name:categoryname
    }
    const token = await AsyncStorage.getItem('token')
    console.log("token", token)
    const res = await axios.post(url,data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log("rs",res.data)
    if(res.data){
      setCategories([...categories,res.data])
      showMessage({
        type: 'success',
        message: res.data.msg
      })
      GetAllCategories();
      setCategoryName('')
    }
  }

  return (
    <View style={styles.container}> 
    <View style={{...styles.inputView}}>
    <TextInput
    placeholder='Enter Categeory name'
    onChangeText={val => setCategoryName(val)}
    value={categoryname}
    style={{...styles.innerinput}}
    
    />
     <Pressable onPress={AddCategeory} style={{...styles.addButton,backgroundColor:'green'}}>
                <Text style={{...styles.buttontext}}>Add</Text>
              </Pressable>
    </View>
     
      <FlatList
      style={{flex:1}}
      data={categories}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
         <View style={{...styles.flatlistview}}>
              <Text style={{color:'black'}}>{item.name}</Text>
              <Pressable onPress={() => handleDelete(item)} style={{...styles.addButton,backgroundColor:'red'}}>
                <Text style={{...styles.buttontext}}>Delete</Text>
              </Pressable>
          </View>
      )}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  inputView:{
    marginVertical:20,
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between',
    alignItems:'center'
  },
  innerinput:{
    backgroundColor:'white',
    width:'70%'
  },
  addButton:{
    height:50,
    width:80,
    alignItems:'center',
    justifyContent:'center'
  },
  buttontext:{
    color:'white',
    fontSize:20
  }
,
flatlistview:{
  flex:1,
  margin:10,
  alignItems:'center',
  backgroundColor:'white',
  display:'flex',
  justifyContent:'space-between',
  paddingHorizontal:10,
  paddingVertical:10,
  flexDirection:'row'
}

})