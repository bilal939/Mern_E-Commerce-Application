import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../assets/icon.png')}
                style={{ resizeMode: 'contain', height: 50 }}
            /> */}
            <Text style={styles.title}>Easy Shop</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'white'
    },
    title:{
        fontWeight:'bold',
        textAlign:'center',
        color:'black',
        fontSize:20,
    },
})