import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormConatiner from '../../Shared/Form/FormConatiner';
import Input from '../../Shared/Form/Input';
import { Dropdown } from 'react-native-element-dropdown';
import { countiresdata } from '../../assets/data/data';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { Button } from '@rneui/themed';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const Checkout = (props) => {
  const cartiem = useSelector((state) => state.cart.cartitem)

  const [orderitem, setorderitems] = useState([])
  const[value,setvalue] = useState('Select Item')
  const [shippingdetails, setshippingDetails] = useState({
    phone: "",
    Address1: "",
    Address2: "",
    zipCode: "",
    city: "",
  })

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };


  useEffect(() => {
    setorderitems(cartiem)
  }, [cartiem])

  const sethandler = (name, value) => {
    setshippingDetails({
      ...shippingdetails,
      [name]:value
    })
  }

  
  let focus = useIsFocused();

  useEffect(()=>{
   if(!focus){
    setshippingDetails('')
    setvalue('')
   }
  },[focus])

 
  let navigation = useNavigation();
  const HandleButton = () => {
    const order = {
      city:shippingdetails.city,
      country:value,
      dateOrdered:Date.now(),
      orderitem:orderitem,
      phone:shippingdetails.phone,
      ShippingAddress1:shippingdetails.Address1,
      ShippingAddress2:shippingdetails.Address2,
      zip:shippingdetails.zipCode
    }
    navigation.navigate('Payment',{order:order})
  }
  return (
    <View style={{ flex: 1 }}>
      <FormConatiner title={"Shipping Address"}>
        <Input
          name={'phone'}
          value={shippingdetails.phone}
          placeholder={'Enter Your number'}
          autoCorrect={false}
          onChangeText={(value)=>sethandler('phone',value)}
          secureTextEntry={false}
          keyboardType={'numeric'}
        />
        <Input
          name={'Address1'}
          value={shippingdetails.Address1}
          placeholder={'Enter Your Address1'}
          autoCorrect={false}
          onChangeText={(value)=>sethandler('Address1',value)}
          secureTextEntry={false}
        />
        <Input
          name={'Address2'}
          value={shippingdetails.Address2}
          placeholder={'Enter Your Address2'}
          autoCorrect={false}
          onChangeText={(value)=>sethandler('Address2',value)}
          secureTextEntry={false}
        />
        <Input
          name={'city'}
          value={shippingdetails.city}
          placeholder={'Enter Your city'}
          autoCorrect={false}
          onChangeText={(value)=>sethandler('city',value)}
          secureTextEntry={false}
        />
        <Input
          name={'zipCode'}
          value={shippingdetails.zipCode}
          placeholder={'Enter zip Code'}
          autoCorrect={false}
          onChangeText={(value)=>sethandler('zipCode',value)}
          secureTextEntry={false}
          keyboardType={'numeric'}
        />
        <Dropdown
        mode='modal'
        style={styles.dropdown}
        data={countiresdata}
        renderItem={renderItem}
        placeholder={value === '' ? "Select item":value}
        placeholderStyle={{color:'black'}}
        selectedTextStyle={{color:'black'}}
        value={value}
        renderRightIcon={() => (
          <Icon
            style={styles.icon}
            color="black"
            name="chevron-down"
            size={20}
          />
        )}
        onChange={item => {
          console.log(item)
          setvalue(item.name);
        }}
      />
      <Button size='md' onPress={() =>HandleButton()} buttonStyle={{paddingHorizontal:30,paddingVertical:10}} containerStyle={styles.buttonstyle} title={'Confirm'} color={'success'} />
        </FormConatiner>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({
  dropdown: {
    marginTop:10,
    height:50,
    color:'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width:'90%',
    backgroundColor:'white',
    paddingHorizontal:10
  },

  textItem:{
    color:'black',
    fontSize:18,
    marginVertical:5,
    
  },
  item:{
    paddingHorizontal:10,
    paddingVertical:10.,
    borderTopColor:'silver',
    borderTopWidth:0.5,
    borderBottomWidth:0.5

  }
  ,
  buttonstyle:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
  }
})