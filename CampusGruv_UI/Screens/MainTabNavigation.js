import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { TabContainer } from '../App'
import io from 'socket.io-client';
import { connect } from "react-redux";
import { connectSocket, unreadMsg, unreadNoti } from "../ReduxStore/Actions/index";

class MainTabNavigation extends React.Component {

    state = {
        unread: false
    }

    async componentDidMount() {
        //Socket connection goes here
        const Token = await AsyncStorage.getItem('TOKEN');
        this.socket = io('https://campusgruv-websocket.herokuapp.com/', { query: `token=${Token}`, transports: ['websocket'] });

        this.socket.on('connect', () => {
            console.log('hello jee connection established')
            this.props.connectSocket(this.socket)
            this.socket.emit('isLoggedIn')
        });
        this.socket.on('isLoggedIn', res => {
            //console.log(res,'res')
        })
        this.socket.on('connect_error', (err) => {
            console.log('hello jee error established', err)
        });
        this.socket.on('user_message', (msg) => {
            console.log('msg received',msg)
            this.props.unreadMsg()
        })
        this.socket.on('notification', (noti) => {
            console.log('noti',noti)
            this.props.unreadNoti()
        })
    }

    render() {
        return (
            <TabContainer screenProps={{Notifications: this.props.notifications, unreadMsg: this.props.unreadMsgs}}/>
        )
    }
}

mapStateToProps = (state) => { //this state will contain FULL redux store all the reducers data


    //use your required reducer data in props i.e reducer1
  
    return { 
        socket: state.socket,
        unreadMsgs: state.UnreadMsgs,
        notifications: state.Notifications
    }  //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
  
  }
  
  export default connect(mapStateToProps, { connectSocket, unreadMsg, unreadNoti })(MainTabNavigation);