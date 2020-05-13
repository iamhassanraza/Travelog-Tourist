import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  View,
  Text,
  TouchableOpacity,
  AppState,
  Dimensions,
  AsyncStorage,
  Image,
  Platform,
} from 'react-native';
import {Icon, Input, Item} from 'native-base';
import PostIcon from 'react-native-vector-icons/MaterialIcons';
//import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
import {ThemeBlue} from '../Assets/Colors';
import TimeAgo from 'react-native-timeago';
import ImagePicker from 'react-native-image-picker';

class Chat extends React.Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View style={{backgroundColor: '#0C91CF'}}>
          <View
            style={{
              height: 50,
              backgroundColor: '#0C91CF',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                {params.name}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                padding: 2,
                alignSelf: 'center',
                left: 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}>
                <PostIcon name="arrow-back" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      connected: false,
      currentMessage: '',
      room_id: null,
    };
  }

  customMessage = props => {
    // console.log('message props', props);
    return (
      <View
        style={{
          marginHorizontal: '2%',
          marginVertical: '1%',
          alignSelf:
            props.currentMessage.user._id === this.props.User.id
              ? 'flex-end'
              : 'flex-start',
        }}>
        <View
          style={{
            width: '100%',
            //alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: props.currentMessage.user.avatar}}
            style={{
              width: 30,
              marginBottom: 8,
              height: 30,
              borderWidth: 0.3,
              alignSelf: 'flex-end',
              borderRadius: 50,
            }}
          />
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 10, paddingLeft: '1%'}}>
              {props.currentMessage.user.name.split(' ')[0] +
                ' ' +
                props.currentMessage.user.name.split(' ')[1].charAt('0') +
                '.'}
            </Text>
            <View
              style={{
                marginTop: 1,
                justifyContent: 'center',
                maxWidth: 250,
                paddingVertical: '1%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  borderRadius: 8,
                  borderColor: ThemeBlue,
                  borderWidth: 1,
                  fontSize: 14,
                  paddingVertical: 2,
                  paddingHorizontal: '2%',
                }}>
                {props.currentMessage.text}
              </Text>
            </View>
            {this.state.imageSource ? (
              <Image
                source={this.state.imageSource}
                style={{width: 200, marginTop: 10, height: 150}}
              />
            ) : null}
            <Text style={{marginLeft: '1%', marginTop: 2, color: 'grey'}}>
              <TimeAgo
                time={
                  new Date(props.currentMessage.created_at.replace(' ', 'T'))
                }
                style={{fontSize: 8}}
              />
            </Text>
          </View>
        </View>
      </View>
    );
  };

  mapMessages = msgs => {
    return msgs.map(m => {
      return {
        _id: m.id,
        text: m.message,
        created_at: m.created_at,
        user: {
          _id: m.user_id,
          name: m.name,
          avatar: m.profile_pic_url,
        },
      };
    });
  };

  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.socket.emit('joinRoom', {
      room_id: `${this.props.navigation.getParam('room_id', null)}`,
    });
    this.props.socket.on('joinRoom', async msgs => {
      // console.log('room joined', msgs);
      if (msgs !== null) {
        var tempArray = await this.mapMessages(msgs);
      } else {
        tempArray = [];
      }
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, tempArray),
      }));
    });
    this.props.socket.on('disconnect', () => {
      console.log('disconnected');
      this.setState({
        messages: [],
      });
    });
    this.props.socket.on('error', () => {
      console.log('hello jee error established');
    });
    this.props.socket.on('message', async msg => {
      console.log(msg, 'msg msg msg');
      if (msg[0].room_id === this.props.navigation.getParam('room_id', null)) {
        const tempArray = await this.mapMessages(msg);
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, tempArray),
        }));
      }
    });
    this.props.navigation.setParams({
      name: this.props.navigation.getParam('name', null),
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  onSend = async (messages = []) => {
    console.log('sent', messages);
    const tempArray = messages.map(m => {
      return {
        created_at: m.createdAt,
        user_id: m.user._id,
        message: m.text,
        profile_pic_url: m.user.avatar,
        name: m.user.name,
        room_id: this.props.navigation.getParam('room_id', null),
      };
    });
    this.props.socket.emit('message', tempArray[0]);
  };

  selectPhoto = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
          cameraRoll: true,
          waitUntilSaved: true,
        },
      },
      response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else {
          const source = {uri: response.uri};
          const fileTypes = /jpeg|jpg|png|gif/;
          const allowedImgSize = 1024 * 1024 * 10;
          // console.log('response image: ', response);
          if (!fileTypes.test(response.type)) {
            alert(
              'Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)',
            );
          } else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)');
          } else {
            this.state.imgCount++;
            this.setState({
              Images: response,
              imageSource: source,
            });
            //setImagess(Imagess.concat(response.fileName));
          }
        }
      },
    );
  };

  render() {
    return (
      <GiftedChat
        listViewProps={{
          style: {
            backgroundColor: '#f9fdfe',
          },
        }}
        compos
        alwaysShowSend={true}
        renderMessage={props => this.customMessage(props)}
        textInputProps={{
          borderRadius: 10,
          placeholder: 'message...',
          borderWidth: 1,
          borderColor: 'grey',
          marginTop: 10,
          justifyContent: 'center',
          paddingLeft: '2%',
          paddingRight: '2%',
          fontSize: 16,
          backgroundColor: 'white',
        }}
        renderActions={() => (
          <Icon
            onPress={() => this.selectPhoto()}
            type="Feather"
            name="camera"
            style={{
              color: 'grey',
              marginLeft: '3%',
              marginBottom: 2,
              fontSize: 32,
            }}
          />
        )}
        messages={this.state.messages}
        showUserAvatar={true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.User.id,
          name:
            this.props.User.first_name +
            ' ' +
            this.props.User.last_name.charAt('0') +
            '.',
          avatar: this.props.User.profile_pic_url,
        }}
      />
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {
    User: state.User,
    socket: state.socket,
  }; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  {CreateUserDetails},
)(Chat);
