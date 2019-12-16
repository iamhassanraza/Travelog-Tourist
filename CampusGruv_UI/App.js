import React, { Component } from 'react'
import { Text, View } from 'react-native'

import CreatePost from './Screens/CreatePost'



export default class App extends Component {
  render() {
    return (
      <View>
        <CreatePost></CreatePost>
      </View>
    )
  }
}
