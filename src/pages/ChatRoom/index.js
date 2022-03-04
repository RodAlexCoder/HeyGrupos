import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList, Modal, ActivityIndicator, Alert} from 'react-native'
import auth from '@react-native-firebase/auth'
import {useNavigation, useIsFocused} from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FabButton from '../../components/FabButton' 
import ModalNewRoom from '../../components/ModalNewRoom'
import firestore from '@react-native-firebase/firestore'
import ChatList from '../../components/ChatList'


export default function ChatRoom() {

  const navigation = useNavigation()

  const isFocused = useIsFocused()

  const [user, setUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [threads , setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const [updateScreen, SetUpdateScreen] = useState(false)


  useEffect(()=>{
      const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null
      setUser(hasUser)

  }, [isFocused])

  useEffect(()=>{
    let isActive = true

    function getChats(){
      firestore()
      .collection('MESSAGE_THREAD')
      .orderBy('lastMessage.createdAt', 'desc')
      .limit(10)
      .get()
      .then((snapshot)=> {
          const threads = snapshot.docs.map (documentSnapshot => {
            return {
              _id: documentSnapshot.id,
              name: '',
              lastMessage : {text: ''},
              ...documentSnapshot.data()
            }
          })

          if(isActive){
            setThreads(threads)
            setLoading(false)
          }
          
      })
    }

    getChats()

    return () => {
        isActive = false
    }

  }, [isFocused, updateScreen])

  function handleSignOut(){
    auth()
    .signOut()
    .then(()=>{
      setUser(null)
      navigation.navigate('SignIn')
    }).catch(()=>{
        console.log('Não possui login')
    })
  }

  function deleteRoom(ownerId, idRoom){
    //pessoa que nao é dona tentando deletar
      if(ownerId !== user?.uid) return

    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja deletar essa sala?",
      [
        {
          text: 'Cancel',
          onPress: ()=>{},
          style: 'cancel'
        },
        {
          text: 'ok',
          onPress: () => handleDeleteRoom(idRoom)
        }
      ]
    )

  }

  async function handleDeleteRoom(idRoom){
    await firestore().collection('MESSAGE_THREAD')
    .doc(idRoom)
    .delete()

    SetUpdateScreen(!updateScreen)
  }

  if(loading) {
    return(
      <ActivityIndicator size={25} color='#555'/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.headerRoom}>
              <View style={styles.headerRoomLeft}>

                {user && (
                  <TouchableOpacity onPress={handleSignOut}>
                        <MaterialIcons name='arrow-back' size={28} color='#FFF'/>
                    </TouchableOpacity>
                )}

                    <Text style={styles.title}>Grupos</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MaterialIcons name='search' size={28} color='#FFF'/>
              </TouchableOpacity>
          </View>

          <FlatList 
          data={threads}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
              <ChatList data={item} deleteRoom={ () => deleteRoom(item.owner, item._id)} userStatus={user}/>
          )}
          
          />

          <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />


          <Modal 
          visible={modalVisible} animationType='slide' transparent={true}
          >
            <ModalNewRoom setVisible={() => setModalVisible(false)} SetUpdateScreen={() => SetUpdateScreen(!updateScreen)}/>
          </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF'
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

