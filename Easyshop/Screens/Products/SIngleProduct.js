import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from '@rneui/themed'
import { useDispatch } from 'react-redux'
import { addtocart } from '../../cartslice/cartslice'

const SingleProduct = (props) => {
  
  const[item,setitem] = useState(props.route.params.item)
  let disptach = useDispatch();
  
  return (
    <View style={styles.container}>
      <View style={styles.imagecontent}>
        <Image PlaceholderContent={<ActivityIndicator size={20} color={'black'}/>} source={{uri:item.image}} style={{ width:'100%', height:'100%'}}/>
      </View>
      <View style={styles.content}>
        <Text style={styles.textdesign}>{item.name}</Text>
        <Text style={styles.textdesign}>{item.description}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.Pricetext}>${item.price}</Text>
        <Pressable onPress={() => disptach(addtocart(item))} style={styles.AddButton}>
          <Text style={styles.AddButtonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SingleProduct

const styles = StyleSheet.create({
    container:{
      flex:1,

    },
    imagecontent:{
        width:'100%',
        height:'50%',
    },
    content:{
        marginTop:20,
        padding:20
    },
    textdesign:{
        color:'black',
        fontSize:20,
        fontWeight:'800'
    },
    AddButton:{
      backgroundColor:'green',
      width:'40%',
      paddingVertical:10,
      justifyContent:'center',
      alignItems:'center'

    },
    row:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginVertical:20,
      paddingHorizontal:20
    },
    AddButtonText:{
      color:'white',
      fontSize:14,
      
    },
    Pricetext:{
      color:'red',
      fontSize:20,
      fontWeight:'900'
    }
})