import React from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';

const height =  Dimensions.get('window').height;
const width =  Dimensions.get('window').width;

export default function ErrorModal({title, body}) {
const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
        <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
            setModalVisible(true)
        }}
        animationType='fade'
        >

            <View style={styles.modalView}>

                <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'red'}}>
                    {title}
                </Text>

                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000'}}>
                    {body}
                </Text>

                <TouchableOpacity style={styles.btnTouch}>
                    <Text>Ok</Text>
                </TouchableOpacity>
                </View>

            </View>

        </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        opacity: 0.35,
        flex: 1
    },
    modalView:{
        width: width * 0.7,
        height: height * 0.2,
        backgroundColor: '#bbb'
    },
    btnTouch: {
        marginVertical: 50,
        textAlign: 'center',
        width: width * 0.4,
        backgroundColor: '#0C6291',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
})
