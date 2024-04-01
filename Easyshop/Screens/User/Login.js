import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormConatiner from '../../Shared/Form/FormConatiner'
import Input from '../../Shared/Form/Input'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { API_URL, LoginUrl } from '../../actions/type'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { adduserdata } from '../../userslice/userslice'

const Login = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    let navigation = useNavigation();
    let disptach = useDispatch();
     

   
    const submithandle =  async () => {
        const url = API_URL + LoginUrl;
        const data = {
            email:email,
            password:password,
        }
        console.log(data)
        const res = await axios.post(url,data);
        
        console.log(res.data)
        if(res.data.status == 200){
            console.log("res data ",res.data)
            await AsyncStorage.setItem('token',res.data.token)
            disptach(adduserdata(res.data.data))
            
            showMessage({
                message:res.data.msg,
                type:'success',
                onHide: () => {
                    navigation.navigate('UserProfile');
                    setemail('')
                    setpassword('')
                  },
            })
            
        }
        else{
            showMessage({
                message:res.data.msg,
                type:'danger'
            })
        }
    }
    return (
        <View style={styles.container}>
            <FormConatiner title={'Login'}>
                <Input
                    placeholder={'Enter Your email'}
                    value={email}
                    placeholderTextColor={'black'}
                    onChangeText={(val) => setemail(val)}
                />
                <Input
                    placeholder={'Enter Your password'}
                    value={password}
                    placeholderTextColor={'black'}
                    onChangeText={(val) => setpassword(val)}
                />
                <Button buttonStyle={styles.Button} onPress={()=>submithandle()} containerStyle={{ width: '50%' }} color={'success'} titleStyle={styles.title} title={'login'} />
            <Text style={styles.subtext}>Dont Have an Account ?</Text>
            <Button onPress={() => navigation.navigate('Register')} buttonStyle={styles.Button} containerStyle={{ width: '30%' }} color={'warning'} titleStyle={styles.title} title={'Register'} />
            </FormConatiner>
        </View>

    )
}

export default Login

const styles = StyleSheet.create({
    Button: {
        marginVertical: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'capitalize'

    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    subtext:{
        marginVertical:20,
        fontSize:18,
        color:'black',
    }
})