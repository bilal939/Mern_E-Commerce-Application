import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
const CategoryFilter = (props) => {

    const { categories } = props;

    return (
        <ScrollView
            bounces={true}
            horizontal
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ backgroundColor: '#f2f2f2', paddingVertical: 10 }}
        >
            <TouchableOpacity onPress={() => props.FilterCategory('all')} style={[styles.all, { backgroundColor: props.isactive == -1 ? '#03bafc' : '#a0e1eb' }]}>
                <Text style={styles.catergorytext}>All</Text>
            </TouchableOpacity>
            {
                categories.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            props.FilterCategory(item)
                        }} key={item.name}
                            style={{ padding: 8, backgroundColor: props.isactive === item._id ? '#03bafc' : '#aee1eb', margin: 5, borderRadius: 2 }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })
            }

        </ScrollView>
    )
}

export default CategoryFilter

const styles = StyleSheet.create({
    all: {
        padding: 8,
        backgroundColor: 'red',
        margin: 5,
        borderRadius: 2
    },
    catergorytext: {
        fontSize: 15,
        fontWeight: '600',
    }
})