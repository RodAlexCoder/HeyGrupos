import React , {useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'

function ModalNewRoom({setVisible}) {

    const [roomName, setRoomName] = useState('')
    
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={setVisible}>
            <View style={styles.modal}></View>
        </TouchableWithoutFeedback>
        

        <View style={styles.modalContent}>
            <Text style={styles.title}>Criar um novo grupo?</Text>

            <TextInput
                value={roomName}
                onChangeText={(text) => setRoomName(text)}
                placeholder="Nome da sua Sala"
                style={styles.input}
            />

            <TouchableOpacity style={styles.buttonArea}>
                <Text style={styles.buttonText}>Criar sala</Text>
            </TouchableOpacity>
        </View>
        
    </View>
  )
}

export default ModalNewRoom

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(34,34,34,0.4)'
    },

    modal:{
        flex: 1,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 15
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold', 
        fontSize: 19,
        marginTop: 14,
        color: '#121212'
    },
    input: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#DDD',
        marginVertical: 15,
        paddingHorizontal: 5,
        fontSize: 16
    },
    buttonArea: {
        borderRadius: 4,
        backgroundColor: '#2e54d4',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFF'
    }
})