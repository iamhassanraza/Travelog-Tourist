import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from './Screens/HomeScreen'
import 'react-native-gesture-handler'

import CreatePost from './Screens/CreatePost'



export default class App extends Component {
  render() {
    return (
      <View>
        <HomeScreen />
      </View>
    )
  }
}
