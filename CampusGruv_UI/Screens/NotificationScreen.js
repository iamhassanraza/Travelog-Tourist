import React, { Component } from 'react';
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
import { Header } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

export default class NotificationScreen extends Component {
  state = {
    notification: [],
    pageNo: 1,
    loading: false
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
    // this.getNoti();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      //The screen is focused
      this.setState({
        pageNo: 1
      })
      this.getNoti();
    });
  }

  getNoti = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    this.setState({
      loading: true
    })
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/user/notifications?user_id=${user_id}&page=${this.state.pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    this.setState({
      notification: JsonResponse.data,
      loading: false
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>

        {Platform.OS == 'ios' ?
          <View style={{ backgroundColor: '#1192d1', }}>
            <View style={{ marginTop: Platform.OS === 'ios' ? 80 : 0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row', justifyContent: 'center', marginTop: Platform.OS == "ios" ? 30 : 0 }}>
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Notifications</Text>
              </View>
            </View>
          </View> :
          <View style={{ marginTop: 0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row', justifyContent: 'center', marginTop: Platform.OS == "ios" ? 30 : 0 }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Notifications</Text>
            </View>
          </View>
        }
        {/* {this.state.notification[0] ? */
          !this.state.loading ?
            <FlatList
              vertical
              data={this.state.notification}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
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
            /> :
            <FlatList
              vertical
              data={[1, 2, 3, 4,5,6,7,8,9,10]}
              renderItem={() =>
                <ContentLoader height={70}>
                  <Circle cx="30" cy="40" r="30" />
                  <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                  <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                </ContentLoader>
              }
            />
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
