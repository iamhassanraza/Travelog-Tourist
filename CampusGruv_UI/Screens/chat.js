import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, TouchableOpacity, AppState, AsyncStorage} from 'react-native'
import PostIcon from 'react-native-vector-icons/MaterialIcons'
//import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';


class Chat extends React.Component {

  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View style={{ backgroundColor: '#1192d1' }}>
          <View style={{ marginTop: Platform.OS == 'ios' ? 38 : 0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{params.name}</Text>
            </View>
            <View style={{ position: 'absolute', padding: 2, alignSelf: 'center', left: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack()
                }}
              >
                <PostIcon name="arrow-back" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      connected: false,
      room_id: null,
    };
  }

  mapMessages = (msgs) => { 
    return msgs.map(m => {
      return {
        _id: m.id,
        text: m.message,
        user: {
          _id: m.user_id,
          name: m.name,
          avatar: m.profile_pic_url
        }
      }
    })
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState,'haha')
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //   console.log('App has come to the foreground!')
    // }
    //this.setState({appState: nextAppState});
  }

  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.socket.emit('joinRoom', {room_id: `${this.props.navigation.getParam('room_id',null)}`})
    this.props.socket.on('joinRoom', async (msgs) => {
      console.log('room joined')
      if(msgs!==null){
        var tempArray = await this.mapMessages(msgs)
      } else {
        tempArray = []
      }
      this.setState( previousState => ({
        messages: GiftedChat.append(previousState.messages, tempArray),
      }) 
      );
    })
    this.props.socket.on('disconnect',() => {
      console.log('disconnected')
      this.setState({
        messages: []
      })
    })
    this.props.socket.on('error', () => {
      console.log('hello jee error established')
    });
    // this.socket.on('notification', (noti) => {
    //   console.log('notification is : ',noti)
    // })
    this.props.socket.on('message', async (msg) => {
      console.log('message arived nibba')
      const tempArray = await this.mapMessages(msg)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, tempArray),
      }))
    });
    this.props.navigation.setParams({
      name: this.props.navigation.getParam('name',null)
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }



  onSend = async (messages = []) => {
    const tempArray =  messages.map(m => {
        return {
          user_id: m.user._id,
          message: m.text,
          profile_pic_url: m.user.avatar,
          name: m.user.name
        }
    })
    this.props.socket.emit('message',tempArray[0])
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  render() {
    return (
        <GiftedChat
        messages={this.state.messages}
        showUserAvatar={true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.User.id,
          name: this.props.User.first_name + ' ' + this.props.User.last_name,
          avatar: this.props.User.profile_pic_url
        }}
      />
    )
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {
    User: state.User,
    socket: state.socket
  }; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps, {CreateUserDetails})(Chat);