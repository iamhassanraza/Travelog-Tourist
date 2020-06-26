import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Linking,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {TabContainer} from '../App';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {
  connectSocket,
  unreadMsg,
  unreadNoti,
} from '../ReduxStore/Actions/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ThemeBlue} from '../Assets/Colors';
import {withNavigation} from 'react-navigation';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

class MainTabNavigation extends React.Component {
  state = {
    unread: false,
    postDetail: this.props.navigation.getParam('postDetail'),
    statusBarColor: ThemeBlue,
    contentType: 'light-content',
  };

  async componentDidMount() {
    //Socket connection goes here
    const Token = await AsyncStorage.getItem('TOKEN');

    this.props.socket.on('connect', () => {
      console.log('hello jee connection established');
      this.props.socket.emit('isLoggedIn');
    });

    this.props.socket.on('isLoggedIn', res => {
      //console.log(res,'res')
    });
    this.props.socket.on('connect_error', err => {
      console.log('hello jee error established', err);
    });
    this.props.socket.on('user_message', msg => {
      console.log('msg received', msg);
      this.props.unreadMsg();
    });
    this.props.socket.on('notification', noti => {
      console.log('noti', noti);
      this.props.unreadNoti();
    });

    this.checkPermissions().then(permission => {
      console.log('indidmount', permission);

      this.getRegistrationToken(Token);

      messaging().onNotificationOpenedApp(remoteMessage => {
        jsonMessage = JSON.parse(remoteMessage.data.info);
        console.log(
          'Notification caused app to open from background state:',
          jsonMessage,
        );
        if (
          jsonMessage.notification_type === 'liked' ||
          jsonMessage.notification_type === 'commented'
        ) {
          this.fetchPostData(jsonMessage.post_id);
        } else if (jsonMessage.notification_type === 'message') {
          console.log('message received');
          this.setState({
            chatDetail: {
              room_id: jsonMessage.room_id,
            },
          });
        }
      });

      messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
          if (remoteMessage) {
            jsonMessage = JSON.parse(remoteMessage.data.info);
            console.log(
              'Notification caused app to open from quit state:',
              jsonMessage,
            );
            if (
              jsonMessage.notification_type === 'liked' ||
              jsonMessage.notification_type === 'commented'
            ) {
              this.fetchPostData(jsonMessage.post_id);
            } else if (jsonMessage.notification_type === 'message') {
              console.log('message received');
              this.setState({
                chatDetail: {
                  room_id: jsonMessage.room_id,
                },
              });
            }
          }
        });
    });

    Linking.addEventListener('url', this.handleOpenURL);
  }

  getRegistrationToken = async userToken => {
    messaging()
      .getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          console.log('fcm', fcmToken);

          // user has a device token
          var response = await fetch(
            `${require('../config').default.production}api/v1/user/update/fcm`,
            {
              method: 'POST',
              body: JSON.stringify({
                fcm_token: fcmToken,
              }),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
              },
            },
          );
          console.log('response', await response.json());
        } else {
          alert('error occured fetching token');
          // user doesn't have a device token yet
        }
      });
  };

  checkPermissions = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled !== 0 || enabled !== -1) {
      // user has permissions
      return true;
    } else {
      try {
        const permission = await messaging().requestPermission();

        return permission; // User has authorised
      } catch (error) {
        return false; // User has rejected permissions
      }
    }
  };

  handleOpenURL = async event => {
    const route = event.url.replace(
      Platform.OS === 'android'
        ? 'https://www.campusgruv.com/post/'
        : 'campusgruv://post/',
      '',
    );
    this.fetchPostData(route);
  };

  fetchPostData = async route => {
    let Token = await AsyncStorage.getItem('TOKEN');
    var response = await fetch(
      `${
        require('../config').default.production
      }api/v1/get/post?post_id=${route}&user_id=${this.props.User.id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    let JsonResponse = await response.json();
    console.log('response of the post', JsonResponse);
    if (JsonResponse.length > 0) this.setState({postDetail: JsonResponse});
  };

  changeStatusBar = obj => {
    this.setState({statusBarColor: obj.color, contentType: obj.contentType});
  };

  clearChatDetail = () => {
    this.setState({chatDetail: null});
  };

  clearPostDetail = () => {
    this.setState({postDetail: null});
  };

  render() {
    return (
      <>
        {Platform.OS === 'ios' ? (
          <View
            style={{
              height: getStatusBarHeight(),
              backgroundColor: this.state.statusBarColor,
            }}>
            <StatusBar translucent={true} barStyle={this.state.contentType} />
          </View>
        ) : null}
        <TabContainer
          screenProps={{
            chatDetail: this.state.chatDetail,
            clearChatDetail: this.clearChatDetail,
            clearPostDetail: this.clearPostDetail,
            postDetail: this.state.postDetail,
            changeStatusBar: this.changeStatusBar,
            rootNavigation: this.props.navigation,
            Notifications: this.props.notifications,
            unreadMsgs: this.props.unreadMsgs,
          }}
        />
      </>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {
    socket: state.socket,
    unreadMsgs: state.UnreadMsgs,
    notifications: state.Notifications,
    User: state.User,
  }; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(
  connect(
    mapStateToProps,
    {connectSocket, unreadMsg, unreadNoti},
  )(MainTabNavigation),
);
