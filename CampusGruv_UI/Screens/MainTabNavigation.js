import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { TabContainer } from '../App'
import io from 'socket.io-client';
import { connect } from "react-redux";
import { connectSocket } from "../ReduxStore/Actions/index";

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
        });
        this.socket.on('connect_error', (err) => {
            console.log('hello jee error established', err)
        });
        this.socket.on('message', (msg) => {
            console.log('msg received')
            // this.setState({
            //     unread: true
            // })
        })
        this.socket.on('notification', (noti) => {
            console.log('noti',noti)
            this.setState({
                unread: true
            })
        })
    }

    render() {
        return (
            <TabContainer screenProps={{unread: this.state.unread}}/>
        )
    }
}

mapStateToProps = (state) => { //this state will contain FULL redux store all the reducers data


    //use your required reducer data in props i.e reducer1
  
    return { socket: state.socket }  //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
  
  }
  
  export default connect(mapStateToProps, { connectSocket })(MainTabNavigation);