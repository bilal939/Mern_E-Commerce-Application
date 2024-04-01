import { PanResponder, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, ListItem } from '@rneui/themed'
const SearchedProducts = (props) => {
    console.log(props)
    const { ProductFilter } = props;
    
    return (
        <ScrollView  style={{flex:1,width:'100%', marginTop:20}}>
            {
                ProductFilter?.length > 0 ? (
                    ProductFilter?.map((item) => {
                        return (
                            <ListItem onPress={()=>props.navigation.navigate('Product Details',{item:item})} key={item.name} bottomDivider>
                            <Image source={{uri:item.image}} style={{ width: 40, height: 40, borderRadius: 50 }} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        )
                       
                    })
                ) : (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.notfoundText}>No products match the selected criteria</Text>
                    </View>
                )
            }

        </ScrollView>
    )
}

export default SearchedProducts

const styles = StyleSheet.create({
    notfoundText:{
        color:'black',
        fontSize:20,
    }
})