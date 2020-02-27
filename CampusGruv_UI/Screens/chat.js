import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import PostIcon from 'react-native-vector-icons/MaterialIcons'
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';

AndroidKeyboardAdjust.setAdjustResize();


class Chat extends React.Component {

  static navigationOptions = props => {
    return {
      header: (
        <View style={{ backgroundColor: '#1192d1' }}>
          <View style={{ marginTop: Platform.OS == 'ios' ? 38 : 0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Messages</Text>
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

  fetchRoomDetails = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/room/details?user_id=486`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
    });
    const JsonResponse = await Response.json();
    console.log(JsonResponse)
    this.setState({
      room_id: JsonResponse[0].room_id
    })
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

  async componentDidMount() {
    const Token = await AsyncStorage.getItem('TOKEN');
    await this.fetchRoomDetails();
    this.socket = io('http://192.168.100.58:4000', { query: `token=${Token}&room_id=${this.state.room_id}`, transports: ['websocket'] });
    this.socket.on('connect', () => {
      console.log('hello jee connection established')
      this.socket.emit('joinRoom')
    });
    this.socket.on('joinRoom', async (msgs) => {
      console.log(msgs[0])
      const tempArray = await this.mapMessages(msgs)
      this.setState( previousState => ({
        messages: tempArray
      }) 
      );
    })
    this.socket.on('error', () => {
      console.log('hello jee error established')
    });
    this.socket.on('message', async (msg) => {
      console.log('message arrived.',msg)
      const tempArray = await this.mapMessages(msg)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, tempArray),
      }))
      // this.setState( previousState => ({
      //   messages: tempArray
      // }) 
      // );
    });
  }



  onSend = async (messages = []) => {
    console.log('sent message ==== >',messages[0])
    const tempArray =  messages.map(m => {
        return {
          user_id: m.user._id,
          message: m.text,
          profile_pic_url: m.user.avatar,
          name: m.user.name
        }
    })
    this.socket.emit('message',tempArray[0])
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  // GiftedChat.append(previousState.messages, messages)

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

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps, {CreateUserDetails})(Chat);