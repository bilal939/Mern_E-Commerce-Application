import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
const { width } = Dimensions.get('screen')
const FormConatiner = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

export default FormConatiner

const styles = StyleSheet.create({
    container:{
        // marginVertical:20,
        flex:1,
        width:width,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:29,
        fontWeight:'500',
        color:'black',
        marginVertical:20
    }
})