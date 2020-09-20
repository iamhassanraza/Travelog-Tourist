import React, { Component } from 'react'
import { Text, View ,ActivityIndicator} from 'react-native'
import {ThemeGrey} from '../assets/Colors/Colors'

export default class LoadingIndicator extends Component {
    render() {
        return (
          <ActivityIndicator size="large" color={ThemeGrey} />
        )
    }
}