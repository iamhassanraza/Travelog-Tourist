import React, { Component } from 'react'
import { Text, View, ScrollView, Alert, Platform } from 'react-native'
import NoticationComponent from '../Components/NoticationComponent'
import { Header } from 'react-native-elements'



export default class NotificationScreen extends Component {
    // static navigationOptions = (props) => {
    //     // const {params = {}} = props.navigation.state;
    //     return  {
    //         header: (
    //           <View style={{backgroundColor: '#1192d1',}}>
    //             <View style={{marginTop:Platform.OS=='ios'?38:0,height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center',marginTop:Platform.OS == "ios" ? 30 : 0}}>
    //                 <View style={{alignSelf: 'center'}}>
    //                     <Text style={{color: 'white', fontSize:20, fontWeight:'bold'}}>Notifications</Text>
    //                 </View>
    //                         </View>
    //             </View>)
    //     }
    //   }
    
    
    render() {
        return (
            <View style={{flex:1}}>
                <Header containerStyle={{height:Platform.OS=='ios'? 80:50}} centerComponent={{text:"Notifications",style:{color:"#FFF",fontWeight:"bold"}}}  />
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
