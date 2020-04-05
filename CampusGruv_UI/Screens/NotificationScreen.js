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
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {connect} from 'react-redux';
import mystore from '../index';
import {clearNoti} from '../ReduxStore/Actions/index';

class NotificationScreen extends Component {
  state = {
    notification: [],
    pageNo: 1,
    loading: false,
    store: mystore,
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
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      //The screen is focused
      this.setState({
        pageNo: 1,
      });
      this.getNoti();
    });
    this.focusListener = this.props.navigation.addListener('didBlur', () => {
      this.state.store.dispatch(clearNoti());
    });
  }

  getNoti = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    this.setState({
      loading: true,
    });
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/user/notifications?user_id=${user_id}&page=${this.state.pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log('hahahah', JsonResponse.data[0]);
    this.setState({
      notification: JsonResponse.data,
      loading: false,
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {Platform.OS == 'ios' ? (
          <View style={{backgroundColor: '#1192d1'}}>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 80 : 0,
                height: 50,
                backgroundColor: '#1192d1',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: Platform.OS == 'ios' ? 30 : 0,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                  Notifications
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: 0,
              height: 50,
              backgroundColor: '#1192d1',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: Platform.OS == 'ios' ? 30 : 0,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                Notifications
              </Text>
            </View>
          </View>
        )}
        {/* {this.state.notification[0] ? */
        !this.state.loading ? (
          <FlatList
            vertical
            data={this.state.notification}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <NoticationComponent
                userdp={item.userNotification.profile_pic_url}
                postId={item.posts !== null ? item.posts.id : null}
                comments={item.comments}
                description={
                  item.posts !== null ? item.posts.description : null
                }
                first_name={item.userNotification.first_name}
                last_name={item.userNotification.last_name}
                userId={item.userNotification.id}
                userWiseLike={item.userWiseLike}
                userSavedPost={item.userSavedPost}
                isFollowing={false}
                title={item.posts !== null ? item.posts.title : null}
                views={item.posts !== null ? item.posts.view_count : null}
                imageurl={
                  item.postDetail.length > 0
                    ? item.postDetail[0].image_url
                    : 'https://travelog-pk.herokuapp.com/images/default.png'
                }
                uri={item.userNotification.profile_pic_url}
                unread={index <= this.props.Notifications.qty ? true : false}
                time={new Date(item.created_at.replace(' ', 'T'))}
                activity={item.notification_message}></NoticationComponent>
            )}
          />
        ) : (
          <FlatList
            vertical
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={() => (
              <ContentLoader height={70}>
                <Circle cx="30" cy="40" r="30" />
                <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            )}
          />
        )}
      </View>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {Notifications: state.Notifications}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps)(NotificationScreen);
