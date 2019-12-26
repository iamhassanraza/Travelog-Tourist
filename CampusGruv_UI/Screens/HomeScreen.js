import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import PostsList from '../Components/PostsList'

export default class HomeScreen extends Component {


    render() {

        return (
            <View 
                style={styles.container}
            >
                <PostsList /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:'99%'
    }
})