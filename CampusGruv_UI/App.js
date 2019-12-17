import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from './Screens/HomeScreen'
import InboxComponent from './Screens/chat'
// import InboxComponent from './Components/InboxComponent'
export default class App extends Component {
  render() {
    return (
      <InboxComponent/>
      )
  }
}
