import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  AsyncStorage,
  TouchableHighlightBase,
  SafeAreaView,
} from 'react-native';
import NoticationComponent from '../Components/NoticationComponent';
import {Header} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import mystore from '../index';
import {clearNoti} from '../ReduxStore/Actions/index';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {ThemeBlue} from '../Assets/Colors';

class NotificationScreen extends Component {
  state = {
    notification: [],
    pageNo: 1,
    loading: false,
    store: mystore,
  };

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
  //${require('../config').default.production}

  getNoti = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    this.setState({
      loading: true,
    });
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/user/notifications?user_id=${user_id}&page=${this.state.pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log('notis', JsonResponse);
    this.setState({
      notification: JsonResponse.data,
      loading: false,
    });
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
        {Platform.OS == 'ios' ? (
          <View style={{backgroundColor: '#0C91CF'}}>
            <View
              style={{
                height: 50,
                backgroundColor: '#0C91CF',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Activity
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: 0,
              height: 50,
              backgroundColor: '#0C91CF',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: Platform.OS == 'ios' ? 30 : 0,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Activity
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
                userCampus={item.userNotification.campus.description}
                userSavedPost={item.userSavedPost}
                isFollowing={item.isFollowing}
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
                activity={item.notification_message}
              />
            )}
          />
        ) : (
          <UIActivityIndicator color={ThemeBlue} />
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
