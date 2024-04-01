import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deliveryMethod } from '../../assets/data/data';
import { CardPaymenttype } from '../../assets/data/data';
import { Button, Header, ListItem } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const Payment = (props) => {
  const order = props.route?.params?.order;
  console.log("order",order)
  const [selectedvalue, setselectedvalue] = useState('')
  const [value, setvalue] = useState('')
  let navigation = useNavigation();
  let focus = useIsFocused();

  useEffect(() => {
    if (!focus) {
      setselectedvalue('')
      setvalue('')
    }
  }, [focus])

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Payment Method</Text>
      {deliveryMethod.map((item) => {
        return (
          <ListItem style={styles.liststyle} key={item.name} onPress={() => setselectedvalue(item.value)} >
            <ListItem.Title style={{color:selectedvalue == item.value ? 'orange' : 'black'}}>{item.name}</ListItem.Title>
          </ListItem>
        )
      })}
      {
        selectedvalue === 3 ? (
          <>
            <Text style={[styles.title, { marginTop: 20 }]}>Select Card Type</Text>
            <Dropdown
              mode='modal'
              style={styles.dropdown}
              data={CardPaymenttype}
              renderItem={renderItem}
              placeholder={value === '' ? "Select type" : value}
              placeholderStyle={{ color: 'black' }}
              selectedTextStyle={{ color: 'black' }}
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
                setvalue(item.name);
              }}
            />
          </>
        ) : (
          null
        )
      }
       <Button size='md' onPress={() => navigation.navigate('Confirm',{finalorder:order})} buttonStyle={{paddingHorizontal:30,paddingVertical:10}} containerStyle={styles.buttonstyle} title={'Confirm'} color={'success'} />
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
    marginVertical: 20
  },
  container: {
    alignItems: 'center',

    flex: 1,
  },
  dropdown: {
    marginTop: 10,
    height: 50,
    color: 'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 10
  },

  textItem: {
    color: 'black',
    fontSize: 18,
    marginVertical: 5,

  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10.,
    borderTopColor: 'silver',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  liststyle: {
    width: '90%',
    borderBottomWidth: 0.5,
    backgroundColor: 'transparent'
  },
  buttonstyle:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
  }
})