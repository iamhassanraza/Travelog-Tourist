import React from 'react';
import {Text, View, AsyncStorage, StatusBar, SafeAreaView} from 'react-native';
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

class MainTabNavigation extends React.Component {
  state = {
    unread: false,
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
  }

  changeStatusBar = obj => {
    this.setState({statusBarColor: obj.color, contentType: obj.contentType});
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
            postDetail: this.props.navigation.getParam('postDetail', null),
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
