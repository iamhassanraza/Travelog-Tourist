import React, { Component } from 'react'
import { Text, View, ScrollView, AsyncStorage } from 'react-native'
import {SearchBar} from 'react-native-elements'
import InboxComponent from '../Components/InboxComponent'
import { FlatList } from 'react-native-gesture-handler';
// import Ws from '@adonisjs/websocket-client'
import WS from 'react-native-websocket'



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

    componentDidMount() {
        const Token = AsyncStorage.getItem('TOKEN');
        this.socket = new WebSocket('ws://campus-gruv-heroku.herokuapp.com', '', {Authorization: `Bearer ${Token}`});
        this.socket.onopen = () => {
            console.log('haaalllooo worldddd')
        }
        this.socket.onmessage = (message) => {
            console.log('on messageeee',message)
        }
        this.socket.onerror = (error) => {
            console.log('error is here my friends',error)
        }
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
            <>
                {/* <WS
                    ref={ref => {this.ws = ref}}
                    url="ws://192.168.100.46/adnois-ws"
                    onOpen={() => {
                        console.log('Open!')
                        this.ws.send('Hello')
                    }}
                    onMessage = {message => {console.log('this is the message',message)}}
                    onError= {error => {console.log('this is the error',error)}}
                    onClose={console.log('connection closed')}
                    reconnect // Will try to reconnect onClose
                /> */}
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
            </>
        )
    }
}
