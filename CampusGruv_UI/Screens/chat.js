import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import PostIcon from 'react-native-vector-icons/MaterialIcons'
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';

//AndroidKeyboardAdjust.setAdjustResize();


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

  state = {
    messages: [],
    connected: false,
    room_id: null,
    messages2: [
      {
        // _id: 1,
        // text: 'Hello developer',
        // createdAt: new Date(),
        // user: {
        //   _id: 2,
        //   name: 'React Native',
        //   avatar: 'https://placeimg.com/140/140/any',
        // },
      }
    ]
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
    this.setState({
      messages: msgs.map(m => {
        return {
          text: m.message,
          user: {
            _id: m.user_id,
            name: m.name,
            avatar: m.profile_pic_url
          }
        }
      })
    })
  }

  async componentDidMount() {
    const Token = await AsyncStorage.getItem('TOKEN');
    await this.fetchRoomDetails();
    this.socket = io('https://campusgruv-websocket.herokuapp.com', { query: `token=${Token}&room_id=${this.state.room_id}`, transports: ['websocket'] });
    this.socket.on('connect', () => {
      console.log('hello jee connection established')
      this.socket.emit('joinRoom')
    });
    this.socket.on('joinRoom', (msgs) => {
      console.log('messages ========> ',msgs)
      this.mapMessages(msgs)
    });
    this.socket.on('error', () => {
      console.log('hello jee error established')
    });
    console.log('Passed Socket *********')
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
        <GiftedChat
        messages={this.state.messages}
        showUserAvatar={true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.User.id,
          name: this.props.User.name,
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