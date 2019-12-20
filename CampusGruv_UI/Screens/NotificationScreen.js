import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import NoticationComponent from '../Components/NoticationComponent'


export default class NotificationScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
            <ScrollView>

            <NoticationComponent uri='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' title="Saifullah" time="1 hour" activity="followed You" />
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Jawad" time="50 minutes" activity="commented On your post"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="ALi" time="40 minutes" activity="Liked Your post"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Hassan" time="30 minutes" activity="shared your post"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Faraz" time="20 minutes" activity="followed you"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Umair" time="10 minutes" activity="Liked your post"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Ammar" time="4 minutes" activity="Shared your post"/>
         
            </ScrollView>
              </View>
        )
    }
}
