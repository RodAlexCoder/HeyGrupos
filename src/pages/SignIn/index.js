import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput , SafeAreaView, Platform} from 'react-native'

export default function SignIn() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState(false)


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Hey Grupos!</Text>

      <Text style={{ marginBottom: 20 }}>ajude, colabore, faça networking!</Text>

    { type && ( 
    
    <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Qual o Seu Nome"
        placeholderTextColor='#9999B'
      />)}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Qual o Seu Email"
        placeholderTextColor='#9999B'
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Sua Senha"
        placeholderTextColor='#9999B'
      />

      <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: type ? '#F53745' : '#57DD86'}]}>
            <Text style={styles.buttonText}>{type ? 'Cadastrar' : 'Acessar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => setType(!type)}>
          <Text>{type ? 'Já  possuo uma conta' : 'Criar uma Conta'}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },

  logo: {
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize: 28, 
    fontWeight: 'bold'
  },

  input: {
    color: '#121212',
    backgroundColor: '#EBEBEB',
    width: '90%',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50
  },
  buttonLogin: {
    width: '90%',
    height: 50,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10,
    borderRadius: 6
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold', 
    fontSize: 19
  }
})

