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
    this.socket = io(`${require('../config').default.pro_chat}`, {
      query: `token=${Token}`,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('hello jee connection established');
      this.props.connectSocket(this.socket);
      this.socket.emit('isLoggedIn');
    });
    this.socket.on('isLoggedIn', res => {
      //console.log(res,'res')
    });
    this.socket.on('connect_error', err => {
      console.log('hello jee error established', err);
    });
    this.socket.on('user_message', msg => {
      console.log('msg received', msg);
      this.props.unreadMsg();
    });
    this.socket.on('notification', noti => {
      console.log('noti', noti);
      this.props.unreadNoti();
    });

    this.checkPermissions().then(permission => {
      console.log('indidmount', permission);

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        //navigation.navigate(remoteMessage.data.type);
      });

      this.getRegistrationToken(Token);

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
        });
    });

    Linking.addEventListener('url', this.handleOpenURL);
  }

  getRegistrationToken = async userToken => {
    messaging()
      .getToken()
      .then(async fcmToken => {
        console.log('fcm', fcmToken);
        if (fcmToken) {
          // user has a device token
          var response = await fetch(
            `${require('../config').default.production}api/v1/user/update/fcm`,
            {
              method: 'POST',
              body: JSON.stringify({
                fcm_token: fcmToken,
              }),
              headers: {
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
    if (enabled) {
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
    const route = event.url.replace(/.*?:\/\/post\//g, '');
    console.log('route', route);
    let Token = await AsyncStorage.getItem('TOKEN');
    var response = await fetch(
      `${
        require('../config').default.production
      }api/v1/get/post?post_id=${route}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    let JsonResponse = await response.json();
    this.setState({postDetail: JsonResponse});
  };

  changeStatusBar = obj => {
    this.setState({statusBarColor: obj.color, contentType: obj.contentType});
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
  }; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(
  connect(
    mapStateToProps,
    {connectSocket, unreadMsg, unreadNoti},
  )(MainTabNavigation),
);
