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
import {Icon, Input, Item, Container} from 'native-base';
import PostIcon from 'react-native-vector-icons/MaterialIcons';
//import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
import {ThemeBlue} from '../Assets/Colors';
import TimeAgo from 'react-native-timeago';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {UIActivityIndicator} from 'react-native-indicators';

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
      pageNo: 1,
      loadMore: false,
      refreshing: false,
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
            {props.currentMessage.message_type === 'text' ? (
              <View
                style={{
                  marginTop: 1,
                  justifyContent: 'center',
                  maxWidth: 250,
                  minWidth: 20,
                  paddingVertical: '1%',
                }}>
                <Text
                  style={{
                    textAlign:
                      props.currentMessage.text.length < 10 ? 'center' : 'auto',
                    borderRadius: 8,
                    borderColor: ThemeBlue,
                    borderWidth: 1,
                    fontSize: 14,
                    paddingVertical: 2,
                    paddingHorizontal: 3,
                  }}>
                  {props.currentMessage.text}
                </Text>
              </View>
            ) : null}
            {props.currentMessage.message_type === 'image' ? (
              <FastImage
                source={{uri: props.currentMessage.text}}
                style={{
                  width: 200,
                  marginTop: 5,
                  borderRadius: 10,
                  height: 200,
                }}
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
        message_type: m.message_type,
        created_at: m.created_at,
        user: {
          _id: m.user_id,
          name: m.name,
          avatar: m.profile_pic_url,
        },
      };
    });
  };

  OnjoinRoom = () => {
    this.props.socket.on('joinRoom', async msgs => {
      console.log('room joined', msgs.length);
      if (msgs !== null) {
        var tempArray = await this.mapMessages(msgs);
        if (tempArray.length === 40) {
          this.setState({loadMore: true});
        }
      } else {
        tempArray = [];
      }
      if (this.state.pageNo > 1) {
        console.log('if ran');
        this.setState(previousState => ({
          messages: GiftedChat.prepend(previousState.messages, tempArray),
          refreshing: false,
        }));
      } else {
        console.log('else ran');
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, tempArray),
          refreshing: false,
        }));
      }
    });
  };

  joinRoom = pageNo => {
    this.props.socket.emit('joinRoom', {
      room_id: `${this.props.navigation.getParam('room_id', null)}`,
      page_no: this.state.pageNo,
    });
  };

  async componentDidMount() {
    this.joinRoom(this.state.pageNo);

    this.OnjoinRoom();

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
        this.setState({imageSource: false});
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
        message_type: 'text',
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
          const allowedImgSize = 1024 * 1024 * 3;
          console.log('response image: ', response);
          if (!fileTypes.test(response.type)) {
            alert(
              'Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)',
            );
          } else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)');
          } else {
            this.state.imgCount++;
            if (
              typeof response.fileName === 'undefined' ||
              response.fileName === null
            ) {
              // on iOS, using camera returns undefined fileName and camera roll returns  null. This fixes that issue, so API can work.
              var getFilename = response.uri.split('/');
              imgName = getFilename[getFilename.length - 1];
              //send message
              const tempArray = [
                {
                  created_at: new Date(),
                  user_id: this.props.User.id,
                  message: response.data,
                  image_name: imgName,
                  image_type: response.type,
                  message_type: 'image',
                  profile_pic_url: this.props.User.profile_pic_url,
                  name:
                    this.props.User.first_name +
                    ' ' +
                    this.props.User.last_name,
                  room_id: this.props.navigation.getParam('room_id', null),
                },
              ];

              this.props.socket.emit('message', tempArray[0]);

              this.setState({
                imageName: imgName,
                Images: response,
                imageSource: source,
              });
            } else {
              const tempArray = [
                {
                  created_at: new Date(),
                  user_id: this.props.User.id,
                  message: response.data,
                  image_name: imgName,
                  image_type: response.type,
                  message_type: 'image',
                  profile_pic_url: this.props.User.profile_pic_url,
                  name:
                    this.props.User.first_name +
                    ' ' +
                    this.props.User.last_name,
                  room_id: this.props.navigation.getParam('room_id', null),
                },
              ];

              this.props.socket.emit('message', tempArray[0]);

              this.setState({
                imageName: response.fileName,
                Images: response,
                imageSource: source,
              });
            }
          }
        }
      },
    );
  };

  renderLoading = () => {
    if (this.state.imageSource)
      return (
        <View
          style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <UIActivityIndicator color={ThemeBlue} />
        </View>
      );
    else return null;
  };

  isCloseToTop({layoutMeasurement, contentOffset, contentSize}) {
    const paddingToTop = 80;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: async ({nativeEvent}) => {
              if (this.isCloseToTop(nativeEvent) && this.state.loadMore) {
                const pageNo = this.state.pageNo + 1;
                this.setState(
                  {
                    refreshing: true,
                    pageNo: pageNo,
                    loadMore: false,
                  },
                  () => {
                    //load earlier messages
                    this.props.socket.emit('joinRoom', {
                      room_id: `${this.props.navigation.getParam(
                        'room_id',
                        null,
                      )}`,
                      page_no: this.state.pageNo,
                    });
                  },
                );
                console.log('load messages m on top');
              }
            },
            style: {
              backgroundColor: '#f9fdfe',
            },
          }}
          renderFooter={this.renderLoading}
          loadEarlier={this.state.refreshing}
          renderLoading={this.renderLoading}
          alwaysShowSend={true}
          renderMessage={props => this.customMessage(props)}
          textInputProps={{
            borderRadius: 10,
            placeholder: 'send a message',
            borderWidth: 1,
            borderColor: 'grey',
            // marginTop: 10,
            paddingLeft: '2%',
            paddingRight: '2%',
            fontSize: 16,
            backgroundColor: 'white',
          }}
          renderActions={() => (
            <Icon
              onPress={this.selectPhoto}
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
      </View>
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
