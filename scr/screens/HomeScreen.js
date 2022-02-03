import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopNav from '../components/TopNav';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            where: {lat: null, lng: null},
            // where: {},
            error: null
        }
    }

    onPressPop(){
        Actions.pop
    }
    requestPermission = async () =>{
        if(Platform.OS === 'ios'){
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: 'whenInUse'
        });
        }

        if(Platform.OS === 'android'){
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        }
    }
    componentDidMount(){
        let geoOptions = {
        enableHighAccuracy: false,
        timeOut: 2000,
        // maximumAge: 10000

        };

        this.requestPermission
        this.setState({ready: false, error: null})
        setInterval(Geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions), 3000)
        
    }

    geoSuccess = (position) =>{
        this.setState({
        ready: true,
        where: {lat: position.coords.latitude, lng: position.coords.longitude}
        
        })
        console.log(position.coords.latitude)
    }

    geoFailure = (err) =>{
        this.setState({error: err.message})
        console.log(err)
    }


    render(){

        return (
          <View style={styles.container}>
            <LinearGradient colors={[ '#07004D', '#0C6291' ]} 
              // locations={[0,0.3,0.6]}
              // start={{x: 0.0, y: 0.25}} end={{x: 0.9, y: 1.0}}
              // angle={25}
              style={styles.linearGradient}>
      
                  <TopNav onPressPop={this.onPressPop}/>
      
                  <View style={styles.profile}>
                      <View style={styles.view1}>
                          <Image
                          source={require('../../assets/man.png')}
                          style ={styles.profileImg}
                          />
      
                          <View style={{marginHorizontal: 20}}>
                              <Text style={styles.text1}>
                                 Lat:  {this.state.where.lat}
                              </Text>
                              <Text style={{...styles.text1, fontSize: 13, marginVertical: 10}}>
                                 err:  {this.state.error}
                              </Text>
                          </View>
                      </View>
      
                      <View style={styles.view2}>
                          <View style={{...styles.view1, marginHorizontal: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/placeholder.png')}
                                  style ={styles.profileImg2}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text1}>
                                      Locations
                                  </Text>
                                  <Text style={{...styles.text1, fontSize: 13, marginVertical: 10}}>
                                      Rating
                                  </Text>
                              </View>
                          </View>
      
                          <View style={{...styles.view1, marginHorizontal: 20}}>
                              <TouchableOpacity activeOpacity={0.5}>
                                  <Image
                                  source={require('../../assets/pin.png')}
                                  style ={styles.profileImg2}
                                  />
                              </TouchableOpacity>
      
                              <View style={{marginHorizontal: 20}}>
                                  <Text style={styles.text1}>
                                      Landmarks
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
