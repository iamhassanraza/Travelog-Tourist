import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import NoticationComponent from '../Components/NoticationComponent'


export default class NotificationScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
            <ScrollView>

            <NoticationComponent uri='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' title="Saifullah" time="1 hour" activity="follow" />
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Jawad" time="50 minutes" activity="comment"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="ALi" time="40 minutes" activity="Like"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Hassan" time="30 minutes" activity="share"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Faraz" time="20 minutes" activity="follow"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Umair" time="10 minutes" activity="Like"/>
            <NoticationComponent  uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Ammar" time="4 minutes" activity="Share"/>
         
            </ScrollView>
              </View>
        )
    }
}
