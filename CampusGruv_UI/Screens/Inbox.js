import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import {SearchBar} from 'react-native-elements'
import InboxComponent from '../Components/InboxComponent'
import { FlatList } from 'react-native-gesture-handler';
// import Ws from '@adonisjs/websocket-client'


export default class Inbox extends Component {


    constructor()
    {
        super();
        this.state= {
            Text:'',
        }
    }
    updateSearch = (e) => {
        this.setState({Text:e})
    }

    data = [
        {
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            title: "Ammar", 
            subtitle: "how are you bro", 
            time: "40 min"
        }
    ]

    render() {
        return (
            <View style={{flex:1}}> 
                <ScrollView>
                    <SearchBar 
                        platform='ios'
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.Text}
                    />
                    <FlatList 
                        data={this.data}
                        renderItem={({item}) => 
                            <InboxComponent   
                                uri={item.uri} 
                                title={item.title} 
                                subtitle={item.subtitle} 
                                time={item.time}
                            />
                        }
                    />
                </ScrollView>
            </View>
        )
    }
}
