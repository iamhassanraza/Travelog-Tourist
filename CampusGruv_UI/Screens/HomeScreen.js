import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Post from '../Components/Post'

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Post />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '90%',
        marginTop: 20,
        paddingTop:20
    }
})