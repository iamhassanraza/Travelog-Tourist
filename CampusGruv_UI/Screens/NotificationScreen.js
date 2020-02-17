import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  AsyncStorage,
  TouchableHighlightBase,
} from 'react-native';
import NoticationComponent from '../Components/NoticationComponent';
import {Header} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

export default class NotificationScreen extends Component {
  state = {
    notification: [],
  };
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
  componentDidMount() {
    this.getNoti();
  }

  getNoti = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/user/notifications?user_id=${user_id}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    this.setState({
      notification: JsonResponse.data,
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        
        {Platform.OS =='ios'?
            <View style={{backgroundColor: '#1192d1', }}>
                <View style={{marginTop:Platform.OS === 'ios'? 80:0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center',marginTop:Platform.OS == "ios" ? 30 : 0}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{color: 'white', fontSize:24, fontWeight:'bold'}}>Notifications</Text>
                    </View>
                </View>
            </View> :
            <View style={{marginTop:0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center',marginTop:Platform.OS == "ios" ? 30 : 0}}>
                <View style={{alignSelf: 'center'}}>
                    <Text style={{color: 'white', fontSize:24, fontWeight:'bold'}}>Notifications</Text>
                </View>
            </View>  
        }
        {this.state.notification[0] ?
        <FlatList
          vertical
          data={this.state.notification}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <NoticationComponent
              // uri={item.userNotification.profile_pic_url}
              // title={
              //   item.userNotification.first_name +
              //   ' ' +
              //   item.userNotification.last_name
              // }
              time="1 hour"
              activity={item.notification_message}
              >

              </NoticationComponent>
          )}
        /> : <></>
        }

        {/* <ScrollView>
                    {
                        this.state.notification && this.state.notification.map((data)=>{
                           return <NoticationComponent uri={data.userNotification.profile_pic_url} title={data.userNotification.first_name+' '+data.userNotification.last_name} time="1 hour" activity={data.notification_message} />
                            
                        })
                    }
                    </ScrollView> */}
      </View>
    );
  }
}
