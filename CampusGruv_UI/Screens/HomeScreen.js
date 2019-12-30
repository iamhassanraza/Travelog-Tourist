import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, BackHandler, FlatList } from 'react-native'
import PostsList from '../Components/PostsList'

export default class HomeScreen extends Component {

    // componentDidMount() {
    //     this.BackHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
    //         // Typically you would use the navigator here to go to the last state.
    //         //this.BackHandler.exitApp();
    //         return true;
    //       });
    // }

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