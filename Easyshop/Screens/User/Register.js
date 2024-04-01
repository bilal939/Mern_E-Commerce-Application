import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormConatiner from '../../Shared/Form/FormConatiner'
import Input from '../../Shared/Form/Input'
import { useNavigation, validatePathConfig } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import Error from '../../Shared/Error'
import axios from 'axios'
import { API_URL, RegisterUserUrl } from '../../actions/type'
import { showMessage } from 'react-native-flash-message'
const Register = () => {

  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const [errors, seterror] = useState("")
  let navigation = useNavigation();



  const validatedata = () => {
    if (email === '') {
      console.log("eemail")
      seterror('email cannot be empty')
      return false
    }
    if (name === '') {
      seterror('name cannot be empty')
      return false
    }
    if (password === '') {
      seterror('password cannot be empty')
      return false
    }
    if (phone === '') {
      seterror('Phone cannot be empty')
      return false
    }
    seterror('')
    return true;
  }

  const onhandlesubmit = async () => {
    if (validatedata()) {

      const data = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        
      }

      
      const url = API_URL + RegisterUserUrl;
      try {
        const res = await axios.post(url, data)
        console.log(res.data)
        if (res.data.status) {
          showMessage({
            message: res.data.msg,
            type: 'success',
            titleStyle: styles.showmessagetitle,
            onHide: () => {
              navigation.navigate('Login');
            },
          })
        }
        else {
          showMessage({
            type: 'danger',
            message: res.data.msg,
            titleStyle: styles.showmessagetitle,
          })
        }
      } catch (error) {
        showMessage({
          type: 'danger',
          message: error,
          titleStyle: styles.showmessagetitle,
        })
      }

    }
  }

  return (
    <View style={styles.container}>
      <FormConatiner title={'Register'}>
        <Input
          placeholder={'Enter Your email'}
          value={email}
          placeholderTextColor={'black'}
          onChangeText={(val) => setemail(val)}
        />
        <Input
          placeholder={'Enter Your name'}
          value={name}
          placeholderTextColor={'black'}
          onChangeText={(val) => setname(val)}
        />
        <Input
          placeholder={'Enter Your phone'}
          value={phone}
          placeholderTextColor={'black'}
          onChangeText={(val) => setphone(val)}
        />
        <Input
          placeholder={'Enter Your password'}
          value={password}
          placeholderTextColor={'black'}
          onChangeText={(val) => setpassword(val)}
        />
        {errors ? <Error error={errors} /> : null}
        <Button onPress={() => onhandlesubmit()} buttonStyle={styles.Button} containerStyle={{ width: '50%' }} color={'success'} titleStyle={styles.title} title={'Register'} />
        <Text style={styles.subtext}>Already have an Account ?</Text>
        <Button onPress={() => navigation.navigate('Login')} buttonStyle={styles.Button} containerStyle={{ width: '30%' }} color={'warning'} titleStyle={styles.title} title={'Login'} />
      </FormConatiner>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button: {
    marginVertical: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'capitalize'

  },
  showmessagetitle: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 20
  },
  subtext: {
    marginVertical: 20,
    fontSize: 18,
    color: 'black',
  }
})