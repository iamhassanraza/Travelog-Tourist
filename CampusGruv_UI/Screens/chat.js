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

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messages2:
        [
          {
            _id: 484,
            text: 'Hello developer',
            //createdAt: new Date(),
            user: {
              _id: 486,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 6,
            text: 'second in array',
            //createdAt: new Date(),
            user: {
              _id: 484,
              name: this.props.User.first_name + ' ' + this.props.User.last_name,
              avatar: this.props.User.profile_pic_url,
            },
          },
          {
            _id: 2,
            text: 'Hello Nibba',
            //createdAt: new Date(),
            user: {
              _id: 486,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 7,
            text: 'Hello Nibba',
            //createdAt: new Date(),
            user: {
              _id: 484,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          }
      ],
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
        //_id: m.user_id === this.props.User.id ? 486 : 484,
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
    this.socket = io('https://campusgruv-websocket.herokuapp.com', { query: `token=${Token}&room_id=${this.state.room_id}`, transports: ['websocket'] });
    this.socket.on('connect', () => {
      console.log('hello jee connection established')
      this.socket.emit('joinRoom')
    });
    this.socket.on('joinRoom', (msgs) => {
      //console.log('messages ========> ',msgs)
      const tempArray = this.mapMessages(msgs)
      console.log("temporary arrrayyy ",tempArray)
      this.setState( previousState => ({
        messages: GiftedChat.append([previousState.messages, tempArray])
      }) 
      );
    })
    this.socket.on('error', () => {
      console.log('hello jee error established')
    });
    this.socket.on('message',(msg) => {
      console.log('message arrived.')
      // $('#messages').append($('<li>').text(`${name} : ${msg}`));
      // window.scrollTo(0, document.body.scrollHeight);
    });
    console.log('Passed Socket *********')
  }



  onSend = async (messages = []) => {
    //this.setState(previousState => {
      // var tempArray = []
      // // tempArray = previousState.messages.reverse()
      // // console.log('reversed array is >>>>>>>>>>>>>>.',tempArray)
      // console.log('message ============ >',messages)
      // console.log('previous state messages =====>',previousState.messages)
      // tempArray = GiftedChat.append( messages, previousState.messages)
      // console.log('temp array is >>>>>>>>>>>>>>.',tempArray)
      // // var tempArray = []
      // // previousState.messages.unshift(messages[0])
      // // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",previousState.messages)
      // // tempArray = this.mapMessages(previousState.messages)
      // // console.log("*********************************************************",tempArray)
      // return {
      //   messages: tempArray
      // }
    // })
    console.log('original msg is *****', messages)
    console.log('previous messages are *****', this.state.messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // GiftedChat.append(previousState.messages, messages)

  render() {
    console.log('this.state.messages =========> ',this.state.messages)
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