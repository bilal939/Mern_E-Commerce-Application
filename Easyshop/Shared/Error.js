import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Error = (props) => {
  console.log("ssss",props)
  return (
    <View style={styles.errorview}>
      <Text style={styles.errormessage}>{props.error}</Text>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
    errorview:{
        marginVertical:20,
        width:'100%',
        
    },
    errormessage:{
        color:'red',
        fontSize:20,
        fontWeight:'900',
        textAlign:'center'
    }
})