import React, { Component } from 'react'
import { Text, View, ScrollView, AsyncStorage } from 'react-native'
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
            data: []
        }
        
    }



    updateSearch = (e) => {
        this.setState({Text:e})
    }

    async componentDidMount() {
        const Token = await AsyncStorage.getItem('TOKEN');
        const user_id = await AsyncStorage.getItem('USER_ID');
        const Response = await fetch(
        `https://campus-gruv-heroku.herokuapp.com/api/v1/chat/history`,
        {
            headers: {
            Authorization: `Bearer ${Token}`,
            },
        },
        );
        const JsonResponse = await Response.json();
        this.setState({
            data: JsonResponse.data
        })
        console.log('inbox',JsonResponse.data[0])
    }

    render() {
        return (
            <>
                <View style={{flex:1}}> 
                    <ScrollView>
                        <SearchBar 
                            platform='ios'
                            placeholder="Type Here..."
                            onChangeText={this.updateSearch}
                            value={this.state.Text}
                        />
                        <FlatList 
                            data={this.state.data}
                            renderItem={({item}) => 
                                <InboxComponent  
                                    user_id={item.user.id} 
                                    uri={item.user.profile_pic_url} 
                                    title={item.user.first_name + ' ' + item.user.last_name} 
                                    //subtitle={'hello jee'} 
                                    //time={item.time}
                                />
                            }
                        />
                    </ScrollView>
                </View>
            </>
        )
    }
}
