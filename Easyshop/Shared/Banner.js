import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Image } from '@rneui/themed';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
const { width } = Dimensions.get('screen')
const Banner = () => {

    const [bannerdata, setbannerdata] = useState([])

    useEffect(() => {
        console.log(bannerdata)
    }, [bannerdata])
    useEffect(() => {
        setbannerdata([
            "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
            "https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg",
            "https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg"
        ])
        return () => {
            setbannerdata([])
        }
    }, [])
    return (
        <View>
            {
                bannerdata?.length > 0 ? (
                        <SwiperFlatList
                            data={bannerdata}
                            renderItem={({ item }) => (
                                <View style={styles.child}>
                                    <Image source={{ uri: item }} style={{
                                        width:width,
                                        height:width/2-20,
                                        resizeMode:'contain'
                                    }} />
                                </View>
                            )}
                        />
                ) : (
                    <Text style={{ color: 'black' }}>else hello</Text>
                )
            }

        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    text: { fontSize: width * 0.5, textAlign: 'center' },
})