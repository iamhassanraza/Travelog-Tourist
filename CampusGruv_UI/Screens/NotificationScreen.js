import React, { Component } from 'react'
import { Text, View, ScrollView, Alert, Platform,AsyncStorage, TouchableHighlightBase } from 'react-native'
import NoticationComponent from '../Components/NoticationComponent'
import { Header } from 'react-native-elements'



export default class NotificationScreen extends Component {
    
    state = {
        notificate:null,
    }
    
    static navigationOptions = (props) => {
        const {params = {}} = props.navigation.state;
        return  {   
            header:        
                <View style={{marginTop:Platform.OS=='ios'?38:0,height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center',marginTop:Platform.OS == "ios" ? 30 : 0}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{color: 'white', fontSize:20, fontWeight:'bold'}}>Notifications</Text>
                    </View>
                </View>   
        }
    }

    componentDidMount() {
        this.getNoti()
        console.log('asdasdsa')
    }

    getNoti= async ()=>{
        const Token = await AsyncStorage.getItem('TOKEN');
        const user_id = await AsyncStorage.getItem('USER_ID')
        const Response = await fetch(
            `https://campus-gruv-heroku.herokuapp.com/api/v1/user/notifications?user_id=491&page=1`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            },
          );
          const JsonResponse = await Response.json();
        //   console.log('response',JsonResponse,'JsonResponse',Response,'JsonResponse',Response.json())
        this.setState({
            notificate:JsonResponse.data
        })

      
}    
    render() {
        // console.log(this.state.notificate,'this.state.notificate')
        return (

            <View >
                {/* <Header containerStyle={{height:Platform.OS=='ios'? 80:50,backgroundColor:'#1192d1'}} centerComponent={{text:"Notifications",style:{color:"#FFF",fontSize:20, fontWeight:'bold'}}}  /> */}
               {
Platform.OS =='ios'?
<View style={{backgroundColor: '#1192d1', }}>
                   <View style={{marginTop:Platform.OS === 'ios'? 80:0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center',marginTop:Platform.OS == "ios" ? 30 : 0}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{color: 'white', fontSize:24, fontWeight:'bold'}}>Notifications</Text>
                    </View>
                </View>
                </View>
                :
                <View style={{marginTop:0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center',marginTop:Platform.OS == "ios" ? 30 : 0}}>
                <View style={{alignSelf: 'center'}}>
                    <Text style={{color: 'white', fontSize:24, fontWeight:'bold'}}>Notifications</Text>
                </View>
            </View>  
               }
                <ScrollView>
                    {
                        this.state.notificate && this.state.notificate.map((data)=>{
                           return <NoticationComponent uri={data.userNotification.profile_pic_url} title={data.userNotification.first_name+' '+data.userNotification.last_name} time="1 hour" activity={data.notification_message} />
                            
                        })
                    }
                    </ScrollView>
            </View>
        )
    }
}
