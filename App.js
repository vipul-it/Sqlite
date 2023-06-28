import { View, Text } from 'react-native'
import React from 'react'
import Database from './src/components/Database'
import Getdata from './src/components/Getdata'

const App = () => {
  return (
    <View style={{flex:1}}>
      <Database />
      <Getdata />
    </View>
  )
}

export default App