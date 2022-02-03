import { View, Text, StyleSheet, Dimensions, Image, TextInput, Alert } from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const height =  Dimensions.get('window').height;
const width =  Dimensions.get('window').width;
const URL = 'http://192.168.0.101:3000';


export default function ReportScreen({token}) {

    const [attendance, setAttendance] = useState('')
    const [offering, setOffering] = useState('')
    const [other, setOther] = useState('')

    const getAttendance = (val) =>{
        setAttendance(val);
        console.log(val)
    }
    
    const getOffering = (val) =>{
        setOffering(val);
        console.log(val)
    }
    const getOther = (val) =>{
        setOther(val);
        console.log(val)
    }

    const reportHandler = () =>{
        fetch(`${URL}/user/report`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                attendance: attendance,
                offering: offering,
                extra: other
            })
        })
        .then(res => res.json())
        .then(data =>{ 
            setAttendance('')
            setOffering('')
            setOther('')
            
            console.log(data)})
        .catch(err =>{
            console.error(err)
            Alert.alert('Error', `Something Happened ${err}`, ['Okay'])
        })
    }

    const submitHandler = () =>{
        console.log(token)
    }
    
    
  return (
    <View style={styles.container}>
        <LinearGradient colors={[ '#0C6291', '#07004D']} 
        // locations={[0,0.3,0.6]}
        // start={{x: 0.0, y: 0.25}} end={{x: 0.9, y: 1.0}}
        // angle={25}
        style={styles.linearGradient}>
            

            <View style={styles.view1}>
                <Image
                source={require('../../assets/logo.jpg')}
                style={styles.imgLogo}
                />

                <View style={{flexDirection: 'row', marginVertical: 50}}>
                    <TouchableOpacity style={{marginHorizontal: 50}}>
                        <Text style={styles.textBtn}>
                            Report
                        </Text>
                    </TouchableOpacity>

                    
                </View>

                <View>
                    <View style={{marginVertical: 30}}>
                        <TextInput
                        placeholder='Attendance'
                        value={attendance}
                        onChangeText={val => getAttendance(val)}
                        style={styles.textInp}
                        keyboardType='numeric'
                        />
                    </View>

                    <View>
                        <TextInput
                        placeholder='Offering'
                        value={offering}
                        onChangeText={val => getOffering(val)}
                        style={styles.textInp}
                        keyboardType='numeric'

                        />
                    </View>

                     <View>
                        <TextInput
                        onChangeText={val => getOther(val)}
                        value={other}
                        placeholder='Other'
                        multiline={true}
                        style={styles.textInp2}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnTouch} onPress={() => reportHandler()}>
                        <Text style={styles.btn}> Submit</Text>
                    </TouchableOpacity>
                </View>

                

            </View>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height

    },
    linearGradient:{
        height: height,
        width: width
    },
    imgLogo:{
        height: 40,
        width: 40,
        borderRadius: 100,
        alignSelf: 'center'
    },
    view1:{
        flex: 1,
        top: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    textInp:{
        color: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        width: width * 0.7
    },
    textInp2:{
        color: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        width: width * 0.7,
        height: 150
    },
    btn:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    btnTouch: {
        marginVertical: 50,
        textAlign: 'center',
        width: width * 0.5,
        backgroundColor: '#0C6291',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    view2:{
        flexDirection: 'row',
        marginVertical: 50
    },
    logo:{
        width: 30,
        height: 30
    }
})


