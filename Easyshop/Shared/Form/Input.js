import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = (props) => {
  return (
    <TextInput
    style={styles.input}
    placeholder={props.placeholder}
    value={props.value}
    id={props.id}
    placeholderTextColor={'black'}
    autoCorrect={props.autoCorrect}
    onChangeText={props.onChangeText}
    onFocus={props.onFocus}
    secureTextEntry={props.secureTextEntry}
    keyboardType={props.keyboardType}
    />
  )
}

export default Input

const styles = StyleSheet.create({
    input:{
        width:'90%',
        paddingVertical:10,
        paddingHorizontal:10,
        marginVertical:10,
        height:50,
        borderWidth:1,
        borderColor:'transparent',
        backgroundColor:'white',
        color:'black'
    }
})