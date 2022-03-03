import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList, Modal} from 'react-native'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FabButton from '../../components/FabButton' 
import ModalNewRoom from '../../components/ModalNewRoom'

export default function ChatRoom() {

  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false)

  function handleSignOut(){
    auth()
    .signOut()
    .then(()=>{
        navigation.navigate('SignIn')
    }).catch(()=>{
        console.log('Não possui login')
    })
  }

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.headerRoom}>
              <View style={styles.headerRoomLeft}>
                    <TouchableOpacity onPress={handleSignOut}>
                        <MaterialIcons name='arrow-back' size={28} color='#FFF'/>
                    </TouchableOpacity>

                    <Text style={styles.title}>Grupos</Text>
              </View>

              <TouchableOpacity>
                        <MaterialIcons name='search' size={28} color='#FFF'/>
              </TouchableOpacity>
          </View>

          <FabButton setVisible={() => setModalVisible(true)} />


          <Modal 
          visible={modalVisible} animationType='slide' transparent={true}
          >
            <ModalNewRoom setVisible={() => setModalVisible(false)}/>
          </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerRoom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#2e54d4',
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20
    },
    headerRoomLeft: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFF',
      paddingLeft: 10
    }

})

