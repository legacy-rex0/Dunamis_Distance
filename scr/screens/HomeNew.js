import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopNav from '../components/TopNav';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation'
import RNLocation from 'react-native-location'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const URL = 'http://192.168.0.101:3000';

export default function HomeNew({token, utype}){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [lead, setLead] = useState(false)
    const [viewLocation, setViewLocation] = useState({})
   
    

        if (utype === 0 || utype === 1){
            // useEffect(() =>{

                fetch(`${URL}/user`,{
                        method: 'GET',
                        headers:{
                            'Accept':  'application/json',
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                        
                    })
                    .then(res => res.json())
                    .then(response => response.data)
                    .then(data => {
                        setUsername(data.user.fullName)
                        setEmail(data.user.email)
                        console.log(data)

                        const onReport = () =>{
                            console.log('reporting')
                        }
                        
                        
                    })
                    .catch(err =>{
                        console.error(err)
                    })    
            // }, [])
        
        }
        
        if (utype === 1){
            fetch(`${URL}/user/leads`,{
                    method: 'GET',
                    headers:{
                        'Accept':  'application/json',
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                    
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    // setName(data.user.name)
                    setLead(true)

                    // fetch('http://192.168.0.102:3000/',{
                    //     method: 'PATCH',
                    //     headers:{
                    //         'Accept':  'application/json',
                    //         Authorization: 'Bearer ' + token,
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         longitude: location.latitude, 
                    //         latitude: location.longitude,
                    //     })
                    
                    // })
                    // .then(res => res.json())
                    // .then(update => {
                    //     console.log(update)
                    // })
                    // .catch(err =>{
                    // console.error(err)
                    // }) 
                
                })
                .catch(err =>{
                    console.error(err)
                })    
        
            }
        

    const onPressPop = () =>{
        Actions.pop()
    }
    

   
// {latitude: null, longitude: null}
    // const [viewLocation, setViewLocation] = useState({Lat: null, Lng: null})
    const [tweet, setTweet] = useState([viewLocation.longitude, viewLocation.latitude]);

    const [name, setName] = useState('')

    const resultLocation = async() =>{

        let location;

        // useEffect(async()=>{
            // setInterval(async() => {
                location = await RNLocation.getLatestLocation({timeout: 50})
                // setInterval(location, 3000)
                console.log(location.latitude, location.longitude)
                setViewLocation({Lat: location.latitude, Lng: location.longitude})

                fetch(`${URL}/user`,{
                        method: 'PATCH',
                        headers:{
                            'Accept':  'application/json',
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            longitude: location.latitude, 
                            latitude: location.longitude,
                        })
                    
                    })
                    .then(res => res.json())
                    .then(update => {
                        console.log(update)
                    })
                    .catch(err =>{
                    console.error(err)
                    })
            // },500)
    
            // setTweet([viewLocation.longitude, viewLocation.latitude])
    
        // }, [])
    }
    const getLocation = async () => {
        
        let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
            detail: 'fine' // or 'fine'
        }
        });
    
        // console.log(permission)

        if(!permission) {
        permission = await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
            detail: "fine",
            rationale: {
                title: "We need to access your location",
                message: "We use your location to show where you are on the map",
                buttonPositive: "OK",
                buttonNegative: "Cancel"
            }
            }
        })
        console.log(permission)
        
        } else{
            useEffect(() =>{
                resultLocation()
               
            })
        }
    }
    //  console.log(tweet)
   
     
     getLocation()

    //  useEffect(() =>{
    //      resultLocation();
    //  }, [])

     const onReport = () =>{
        
        Actions.report({token})
    }
        
    
        return (
           
          <View style={styles.container}>
            <LinearGradient colors={[ '#07004D', '#0C6291' ]} 
              // locations={[0,0.3,0.6]}
              // start={{x: 0.0, y: 0.25}} end={{x: 0.9, y: 1.0}}
              // angle={25}
              style={styles.linearGradient}>
      
                  <TopNav onPressPop={onPressPop} onReport={onReport} />

                  
      
                  <View style={styles.profile}>
                      <View style={styles.view1}>
                          <Image
                          source={require('../../assets/man.png')}
                          style ={styles.profileImg}
                          />

                            
                                <Image
                                style={{width: 25, height: 25, position: 'absolute', right: 18}}
                                // onPress={()=>getLocationView()}
                                source={require('../../assets/refresh.png')}
                                />
                           
      
                          <View style={{marginHorizontal: 20}}>
                              <Text style={styles.text1}>
                                 Welcome  {username}
                              </Text>
                              {lead ? 
                                <Image
                                style={{width: 15, height: 15}}
                                source={require('../../assets/star.png')}
                                />
                              :
                                <Text style={{...styles.text1, fontSize: 10}}>
                                 {email}
                              </Text>
                                }
                          </View>
                      </View>
      
                      <View style={styles.view2}>
                          <View style={{...styles.view1, marginHorizontal: 20}}>
                              <TouchableOpacity activeOpacity={0.5} onPress={() => resultLocation()}>
                                  <Image
                                  source={require('../../assets/placeholder.png')}
                                  style ={styles.profileImg2}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text1}>
                                      {viewLocation.Lat}
                                  </Text>
                                  <Text style={{...styles.text1, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20}}>
                              <TouchableOpacity activeOpacity={0.5} onPress={() => resultLocation()}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={styles.profileImg2}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text1}>
                                        {viewLocation.Lng}
                                  </Text>
                                  <Text style={{...styles.text1, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
                      </View>
      
                  </View>
      
                  <View style={styles.layout1}>
      
                      <View style={{padding: 10}}>
                          <Text style={styles.text2}>
                              Landmarks
                          </Text>
      
                      </View>
      
                      <ScrollView>
      
                          <View style={{...styles.view1, marginHorizontal: 20, marginVertical: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={{height: 35, width: 35}}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text3}>
                                      Landmarks
                                  </Text>
                                  <Text style={{...styles.text3, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20, marginVertical: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={{height: 35, width: 35}}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text3}>
                                      Landmarks
                                  </Text>
                                  <Text style={{...styles.text3, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20, marginVertical: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={{height: 35, width: 35}}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text3}>
                                      Landmarks
                                  </Text>
                                  <Text style={{...styles.text3, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20, marginVertical: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={{height: 35, width: 35}}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text3}>
                                      Landmarks
                                  </Text>
                                  <Text style={{...styles.text3, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20, marginVertical: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={{height: 35, width: 35}}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text3}>
                                      Landmarks
                                  </Text>
                                  <Text style={{...styles.text3, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20, marginVertical: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={{height: 35, width: 35}}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text3}>
                                      Landmarks
                                  </Text>
                                  <Text style={{...styles.text3, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
                      </ScrollView>
      
      
                  </View>
                </LinearGradient>
          </View>
        );
    
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
    },
    view1:{
        flexDirection: 'row',
        alignItems: 'center'

    },
    view2:{
        marginTop: height *0.1,
        flexDirection: 'row',
        width: width
        
    },
    linearGradient:{
        height: height,
        width: width
    },
    profile:{
        flex: 1,
        top: height * 0.3,
        padding: 40

    },
    profileImg:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    profileImg2:{
        width: 35,
        height: 35,
        borderRadius: 40
    },
    text1: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        
    },
    text3: {
        color: '#000',
        fontSize: 15,
        fontWeight: '500',
        
    },
    layout1: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
        top: 20
    },
    text2:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    }
})
