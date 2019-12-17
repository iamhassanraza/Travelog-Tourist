import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import Post from '../Components/Post'
import Test from '../Components/Test'
import Test1 from '../Components/Test1'

export default class HomeScreen extends Component {

    state = {
        posts: [1,2,3,4,5,6]
    }

    render() {
        return (
            <View style={styles.container}>
                
                <Test1/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        borderWidth:5,
        height:'100%'
    }
})