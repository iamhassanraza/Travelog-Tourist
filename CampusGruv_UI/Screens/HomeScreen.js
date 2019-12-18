import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import PostsList from '../Components/PostsList'

export default class HomeScreen extends Component {

    state = {
        posts: [1,2,3,4,5,6]
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <PostsList />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:'100%'
    }
})