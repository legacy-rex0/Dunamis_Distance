import { View, Text, StyleSheet, Dimensions, Image, TextInput, Alert, Modal, Animated, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import ErrorModal from '../components/ErrorModal';
// import Animated from 'react-native-reanimated';


const height =  Dimensions.get('window').height;
const width =  Dimensions.get('window').width;
const URL = 'http://192.168.0.101:3000';

const logoImage = 'https://lh3.googleusercontent.com/eYrg2JIhDoGpKU714EiCTdo0LpI7dOr4OnqGKksFL9Y-BPiJvz9OwdOrMBwqIItD8rWM'


const gotoHome = (token, utype) =>{
    Actions.home({token, utype})
}

// const ModalPop = ({visible, children, falseV}) => {
//     const [showModal, setShowModal] = useState(visible)
//     const scaleValue = useRef(new Animated.Value(0)).current

       
//     useEffect(() => {
//         toggleModal()
//     }, [visible])

//     const toggleModal = () =>{
//         if(visible){
//             setShowModal(true)
//             Animated.spring(scaleValue,{
//                 toValue: 1,
//                 duration: 300,
//                 useNativeDriver: true
//             }).start()
    
//             // setTimeout(() =>{
//             //     setShowModal(false)
//             // }, 800)

//         } else{
//             // setTimeout(() => setShowModal(falseV), 200)
//             // Animated.timing(scaleValue, {
//             //     toValue: 0,
//             //     duration: 300,
//             //     useNativeDriver: true
//             // }).start()
//         }
//     }

//     return <Modal transparent visible={showModal}>
//         <View style={styles.modalBackground}>
//             <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>{children}</Animated.View>
//         </View>
//     </Modal>;
// }

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

    
export default function SignUp() {

    const [modalVisible, setModalVisible] = useState(false)
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const getEmail = (val) =>{
        setEmail(val);
        console.log(val)
    }

    const getPhone = (val) =>{
        setPhone(val.toString());
        console.log(val.toString())
    }

    const getName = (val) =>{
        setName(val.toString());
        console.log(val)
    }
   
    const submitHandler = () =>{
        console.log(email, phone, name);
        let data = new FormData();
        data.append('email', email);
        data.append('phone', phone);
        data.append('name', name);

    // Get Leads

    fetch(`${URL}/user/login`, {
        method: 'POST',
        headers:{
            'Accept':  'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            phone: phone,
            name: name
        })
        
        // data
        
    
    })
    .then(res => res.json())
    .then(response => response.data)
    .then(data => {
        console.log(data)

        setEmail('')
        setPhone('')
        setName('')

       gotoHome(data.token, data.user.utype)
    })
    .catch(err =>{
        console.error(err)
        Alert.alert(`Something Happened`, `Error: ${err}`,['Okay'])
    })
    }
        const [visible, setVisible] = useState(false)

        // const timeVisible = () => {
        //     setVisible(true);

        //     setTimeout(() =>{
        //         setVisible(false)
        //     }, 800)
        // }
  return (

    
    <View style={styles.container}>


        {/* <ModalPoup visible={visible}>
            <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                    source={require('../../assets/close.png')}
                    style={{height: 30, width: 30}}
                />
                </TouchableOpacity>
            </View>
            </View>
            <View style={{alignItems: 'center'}}>
            <Image
                source={require('../../assets/check.png')}
                style={{height: 150, width: 150, marginVertical: 10}}
            />
            </View>

            <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center', color: '#000'}}>
            Congratulations registration was successful
            </Text>
      </ModalPoup> */}

      <LinearGradient colors={[ '#0C6291', '#07004D']} 
        // locations={[0,0.3,0.6]}
        // start={{x: 0.0, y: 0.25}} end={{x: 0.9, y: 1.0}}
        // angle={25}
        style={styles.linearGradient}>

        
           
        
            <View style={styles.view1}>
                {/* <ErrorModal/> */}
                
                <Image
                source={{uri: logoImage}}
                style={styles.imgLogo}
                />

                

                <View>
                    <View style={{marginVertical: 30}}>
                        <TextInput
                        // ref={emailRef}
                        value={email}
                        placeholder='Email'
                        style={styles.textInp}
                        onChangeText={(val) => getEmail(val)}
                        />
                    </View>

                    <View style={{marginBottom: 30}}>
                        <TextInput
                        placeholder='Phone Number'
                        value={phone}
                        style={styles.textInp}
                        onChangeText={(val) => getPhone(val)}
                        />
                    </View>

                    <View style={{marginBottom: 30}}>
                        <TextInput
                        placeholder='Full Name'
                        value={name}
                        style={styles.textInp}
                        onChangeText={(val) => getName(val)}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnTouch} onPress={() => submitHandler()}>
                        <Text style={styles.btn}> Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.view2}>
                    <TouchableOpacity style={{marginHorizontal: 20}} onPress={() => setVisible(true)}>
                        <Image
                        source={require('../../assets/google.png')}
                        style={styles.logo} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 20}}>
                        <Image
                        source={require('../../assets/facebook.png')}
                        style={styles.logo} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 20}}>
                        <Image
                        source={require('../../assets/twitter.png')}
                        style={styles.logo} />
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
    modalBackground:{
        flex: 1,
        backgroundColor: 'rbga(0,0,0,1.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
        width: '100%',
        height: 40,
        alignItems: "center"
    },
    modalContainer:{
        width: '70%',
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 20, 
    }, 
    linearGradient:{
        height: height,
        width: width
    },
    imgLogo:{
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    view1:{
        flex: 1,
        // top: height * 0.1,
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