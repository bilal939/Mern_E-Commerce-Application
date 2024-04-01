import { FlatList, StyleSheet, View, Text, Keyboard, Dimensions, ScrollView, TurboModuleRegistry, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Productlist from './Productlist'
import { Button, SearchBar } from '@rneui/themed'
import SearchedProducts from './SearchedProducts'
import Banner from '../../Shared/Banner'
import CategoryFilter from './CategoryFilter'
import { data } from '../../assets/data/data'
import { categoryjson } from '../../assets/data/data'
import axios from 'axios'
import { API_URL, Get_Cateogry_URL, Get_Product_URL } from '../../actions/type'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addtocategory } from '../../CategorySlice/CategorySlice'
const { width } = Dimensions.get('screen')
const ProductContainer = (props) => {



    const [product, setproduct] = useState([])
    const [ProductFilter, setsearchedProduct] = useState([])
    const [focus, setfocus] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [categories, setcategories] = useState([]);
    const [isactive, setactive] = useState(-1)
    const [initialstate, setinitialstate] = useState(data)
    const [productfltctg, setproductfiltrctg] = useState([])
    const[loading , setloading] = useState(true)


    useEffect(()=>{
      GetProduct();
      getCategories();
    },[])

    const GetProduct = async () => {
        try {
            const url = API_URL + Get_Product_URL;
            console.log(url)
            
            const res = await axios.get(url)
            if (res.data) {
                console.log("ress",res.data.length)
                setproduct(res.data)
                setsearchedProduct(res.data)
                setinitialstate(res.data)
                setproductfiltrctg(res.data)
                setloading(false)
            }
        } catch (error) {
           console.log(error)
        }

    }

    let disptach = useDispatch();

    const getCategories =async() => {
      try {
         const url = API_URL + Get_Cateogry_URL;
         const category = await axios.get(url);
         console.log("cateogries data is",category.data)
         if(category.data){
            setcategories(category.data)
            disptach(addtocategory(category.data))
            setloading(false)
         }
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(() => {

        setfocus(false)
        
        setactive(-1)
        return () => {
            setproduct([])
            setfocus(false)
            setsearchedProduct([])
            setinitialstate([])
            setcategories([])
            setactive(-1)
            setproductfiltrctg([])
        }
    }, [])





    const handlesearchtext = (text) => {
        if (text) {
            const data = product.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
            setsearchedProduct(data)
            setsearchtext(text)
        }
        else {
            setsearchtext(text)
            setsearchedProduct(data)
        }
    }


    const onfocus = () => {
        console.log("onfe")
        setfocus(true)
    }

    const onblur = () => {
        setfocus(false)
    }

    const onClear = () => {
        setfocus(false)
        Keyboard.dismiss();
    }



    const FilterCategory = (ctg) => {

        console.log("ctg is ",ctg)

        {
            ctg === 'all' ? [
                setproductfiltrctg(initialstate),
                setactive(-1)
            ] : [
                setproductfiltrctg(
                    product.filter((item) => item.category._id === ctg.id)
                ),
                setactive(ctg.id)
            ]
        }
    }


    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
        {
            loading ? (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <ActivityIndicator size={25} color={'black'}/>
                </View>
            ):(
                <>
                <SearchBar
                value={searchtext}
                onFocus={onfocus}
                containerStyle={styles.containerStyle}
                placeholder="Search Here..."
                lightTheme={true}
                onBlur={onblur}
                onChangeText={(e) => handlesearchtext(e)}
                inputStyle={styles.inutstyle}
                inputContainerStyle={styles.inputContainerStyle}
                onClear={onClear}
            />
            <View style={{ marginVertical: 10 }}>
                <Banner />
            </View>

            {
                focus === true ? (
                    <SearchedProducts navigation={props.navigation} ProductFilter={ProductFilter} />
                ) : (
                    <>
                        <View>
                            <CategoryFilter FilterCategory={FilterCategory} setactive={setactive} isactive={isactive} categories={categories} />
                        </View>

                        {
                            productfltctg?.length > 0 ? (
                                <FlatList
                                    numColumns={2}
                                    data={productfltctg}
                                    renderItem={({ item }) => <Productlist key={item.id} item={item} navigation={props.navigation} />}
                                    keyExtractor={item => item.name}
                                />
                            ) : (
                                <View style={styles.nofoundview}>
                                    <Text style={styles.text}>No product Found with this categgory</Text>
                                </View>
                            )
                        }


                    </>
                )
            }
                </>
            )
        }

        </View>

    )
}

export default ProductContainer

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 8,
        borderBlockColor: 'white',
        marginVertical: 5
    },
    inputContainerStyle: {
        color: 'black',
        paddingHorizontal: 8,
        borderRadius: 30
    },
    inutstyle: {
        color: 'black',
    },
    nofoundview: {
        height: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontWeight: '800',
        fontSize: 20
    }
})