import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

function FabButton({setVisibe}) {


    function handleNavigateButton(){
        setVisibe()
    }


  return (
    <TouchableOpacity  
    style={styles.containerButton} 
    activeOpacity={0.9}
    onPress={handleNavigateButton}
    >
        <View>
            <Text style={styles.text}>+</Text>
        </View>
        
    </TouchableOpacity>
  )
}

export default FabButton


const styles = StyleSheet.create({
    containerButton: {
        backgroundColor: '#2E54D4',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent : 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '5%',
        right: '6%'
    },

    text: {
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#FFF'
    }
})