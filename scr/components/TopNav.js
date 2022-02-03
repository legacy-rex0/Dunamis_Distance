import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,

} from 'react-native';
import { Actions } from 'react-native-router-flux';


const TopNav = ({onPressPop, onReport}) =>{
    const backHandler = () =>{
        // Actions.report()
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressPop} style={{position: 'absolute', left: 15, top: 15}}>
               <Image
               source={require('../../assets/left.png')}
            //    style={styles.iconLeft}
                style={{width: 25, height: 25 }}
               />
            </TouchableOpacity>
            <TouchableOpacity onPress={onReport} style={{position: 'absolute', right: 15, top: 15}}>
               <Image
               source={require('../../assets/menu.png')}
            //    style={styles.iconLeft}
                style={{width: 20, height: 20, left: 0}}
               />
            </TouchableOpacity>
            

        </View>
    )
}

export default TopNav;

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        marginBottom: '-50%',
        // backgroundColor: '#000',
        width: Dimensions.get('screen').width,
        padding: 20,
        flexDirection: 'row'
    },
    topNav:{

    },
    iconLeft: {width: 25, height: 25, position: 'absolute', left: 10, top: 5, padding:5}
})

