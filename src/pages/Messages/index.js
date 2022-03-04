import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Messages({route}) {

  const {thread} = route.params

  return (
    <View>
          <Text>Tela Messages!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    
})

