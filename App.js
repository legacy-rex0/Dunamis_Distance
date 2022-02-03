import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ReportScreen from './scr/screens/ReportScreen';
import SignUp from './scr/screens/SignUp';
import HomeScreen from './scr/screens/HomeScreen';
import HomeNew from './scr/screens/HomeNew';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="signup" component={SignUp} hideNavBar={true} type='replace' initial={true} />
          <Scene hideNavBar={true}>
            <Scene key="report" component={ReportScreen} hideNavBar={true} type='replace'  />
          </Scene>
          <Scene hideNavBar={true} >
            <Scene key="home" component={HomeNew} hideNavBar={true} type='replace' />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

    // "react-native-reanimated": "^1.13.3",
     {/* <ModalPop visible={visible}>
                <View style={{alignItems: 'center'}} onPress={() => setVisible(!visible)}>
                    {/* <View style={styles.header}>
                        <TouchableOpacity style={{width: 30, height: 30, top: 20}}  onPress={() => setModalVisible(false)}>
                            <Image 
                            // onPress={() => setModalVisible(false)}
                            style={{width: 15, height: 15}}
                            source={require('../../assets/close.png')}/>

                        </TouchableOpacity>
                    </View> */}
                    {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/error.png')}
                        style={{width: 80, height: 80, marginVertical: 10}}
                        />
                    </View>
                    <Text style={{marginVertical: 30, fontSize: 18, textAlign: 'center', 
                    fontWeight: '700', color: '#000'}}>Error</Text>
                    <Text style={{marginVertical: 30, fontSize: 13, textAlign: 'center', 
                    fontWeight: '300', color: '#000'}}>Error Body</Text>

                    <Button title='Close' color='#000' onPress={() => setVisible(false)} />

                    {/* <View></View> */}
                {/* </View>
            </ModalPop> */}
