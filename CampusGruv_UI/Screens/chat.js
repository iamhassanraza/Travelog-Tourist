import React, {Component, PureComponent} from 'react';

import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {
  View,
  Text,
  TouchableOpacity,
  AppState,
  Dimensions,
  AsyncStorage,
  Clipboard,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
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

var {width, height} = Dimensions.get('window');

class Chat extends React.PureComponent {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    console.log('params', params);
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
                  props.navigation.navigate('inbox');
                }}>
                <PostIcon name="arrow-back" color="white" size={25} />
              </TouchableOpacity>
            </View>
            {params.room_type === 'xyz' ? (
              <View
                style={{
                  position: 'absolute',
                  padding: 2,
                  alignSelf: 'center',
                  right: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    params.handleThis();
                  }}>
                  <PostIcon name="more-vert" color="white" size={25} />
                </TouchableOpacity>
              </View>
            ) : null}
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
      imageLoading: true,
      isModalVisible: false,
      editGroupNameOverlay: false,
    };
  }

  imageloaded = image => {
    this.setState({imageLoading: false});
  };

  onLongPress(props) {
    if (props.currentMessage.text) {
      const options = ['Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      props.forwardRef.current.context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(props.currentMessage.text);
              break;
          }
        },
      );
    }
  }

  customMessage = props => {
    var width = 200;
    var height = undefined;
    if (props.currentMessage.message_type === 'image') {
      Image.getSize(
        props.currentMessage.text,
        (srcWidth, srcHeight) => {
          const ratio = width / srcWidth;
          height = srcHeight * ratio;
        },
        error => {
          () => console.log(error);
        },
      );
    }
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
          <FastImage
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
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor:
                    props.currentMessage.user._id === this.props.User.id
                      ? '#2a9ffd'
                      : '#e5e5ea',
                  backgroundColor:
                    props.currentMessage.user._id === this.props.User.id
                      ? '#2a9ffd'
                      : '#e5e5ea',
                }}>
                <Text
                  style={{
                    textAlign:
                      props.currentMessage.text.length < 10 ? 'center' : 'auto',

                    fontSize: 16,
                    paddingVertical: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    color:
                      props.currentMessage.user._id === this.props.User.id
                        ? 'white'
                        : 'black',
                  }}>
                  {props.currentMessage.text}
                </Text>
              </View>
            ) : null}
            {props.currentMessage.message_type === 'image' ? (
              <FastImage
                // resizeMode="contain"
                onLoadEnd={() => this.imageloaded(props.currentMessage.text)}
                source={{
                  uri: props.currentMessage.text,
                  priority: FastImage.priority.high,
                }}
                style={{
                  // borderWidth: 0.8,
                  borderColor: 'grey',
                  backgroundColor: this.state.imageloading ? 'none' : 'grey',
                  width: width,
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
      if (msgs !== null) {
        var tempArray = await this.mapMessages(msgs);
        if (tempArray.length === 40) {
          this.setState({loadMore: true});
        }
      } else {
        tempArray = [];
      }
      if (this.state.pageNo > 1) {
        this.setState(previousState => ({
          messages: GiftedChat.prepend(previousState.messages, tempArray),
          refreshing: false,
        }));
      } else {
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

    this.props.navigation.setParams({
      handleThis: () => {
        this.setState({isModalVisible: true});
      },
    });

    // this.props.socket.on('disconnect', () => {
    //   console.log('disconnected');
    //   this.setState({
    //     messages: [],
    //   });
    // });
    this.props.socket.on('error', () => {
      console.log('hello jee error established');
    });
    this.props.socket.on('message', async msg => {
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
        allowsEditing: true,

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
                  image_name: response.fileName,
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

  renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#f9fdfe',
          borderTopWidth: 0,
        }}
      />
    );
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
      <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
        <GiftedChat
          listViewProps={{
            marginBottom: 10,
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
              }
            },
            style: {
              backgroundColor: '#f9fdfe',
            },
          }}
          renderInputToolbar={this.renderInputToolbar}
          renderFooter={this.renderLoading}
          onLongPress={this.onLongPress}
          loadEarlier={this.state.refreshing}
          renderLoading={this.renderLoading}
          alwaysShowSend={true}
          renderMessage={props => this.customMessage(props)}
          textInputProps={{
            lineHeight: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
            paddingLeft: '2%',
            paddingRight: '2%',
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
        <View>
          <Modal
            style={{margin: 0}}
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.setState({isModalVisible: false})}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingBottom: 30,
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                }}>
                <PostIcon
                  name="cancel"
                  onPress={() => this.setState({isModalVisible: false})}
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 10,
                    fontSize: 20,
                    color: 'grey',
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: 3,
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      borderTopWidth: 2,
                      marginTop: 3,
                      width: 50,
                      borderTopColor: 'grey',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 2,
                    }}>
                    Group chat options
                  </Text>
                  {/* </View> */}
                </View>
              </View>

              <View style={styles.modalOptions}>
                <Icon type="Feather" name="edit" style={styles.optionIcon} />
                <Text
                  onPress={() => {
                    this.setState({
                      isModalVisible: false,
                      editGroupNameOverlay: true,
                    });
                  }}
                  style={styles.TextWithNavigation}>
                  Edit group name
                </Text>
              </View>

              {/* <View style={styles.modalOptions}>
                <Icon type="Feather" style={styles.optionIcon} />
                <Text
                  onPress={() => {
                    this.setState({isModalVisible: false});
                    this.props.navigation.navigate('ReportPost', {
                      PostId: this.props.navigation.getParam(
                        'PostData',
                        'nothing to render',
                      ),
                    });
                  }}
                  style={styles.TextWithNavigation}>
                  Report post
                </Text>
              </View> */}
            </View>
          </Modal>
        </View>
        {this.state.editGroupNameOverlay ? (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              left: 0,
              bottom: 0,
              top: 0,
              right: 0,
              opacity: 0.9,
              backgroundColor: 'black',
              width: width,
              height: height,
            }}>
            <PostIcon
              name="cancel"
              onPress={() => this.setState({editGroupNameOverlay: false})}
              style={{
                position: 'absolute',
                top: 22,
                left: 10,
                fontSize: 25,
                color: IconGrey,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20%',
                width: width,
              }}>
              <Text style={{fontSize: 20, color: 'grey'}}>
                Edit post description
              </Text>
              <View style={{marginTop: '3%'}}>
                <TextInput
                  selectionColor="grey"
                  value={this.state.editGroupName}
                  scrollEnabled={false}
                  multiline={true}
                  autoFocus={true}
                  style={{
                    color: 'grey',
                    width: '100%',
                    height: Dimensions.get('window').height / 3.9,
                    width: Dimensions.get('window').width / 1.1,
                    paddingLeft: 10,
                    paddingRight: 5,
                    marginLeft: '2.5%',
                    marginRight: '2.5%',
                    borderColor: 'grey',
                    borderRadius: 8,
                    borderWidth: 1,
                    textAlignVertical: 'top',
                  }}
                  onChangeText={text => {
                    this.setState({
                      editGroupName: text,
                    });
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{alignItems: 'center', marginTop: '1%'}}
              onPress={() => {
                this.setState(
                  {
                    description: this.state.editGroupName,
                    editGroupNameOverlay: false,
                  },
                  async () => {
                    // const Token = await AsyncStorage.getItem('TOKEN');

                    // let response = await fetch(
                    //   `${
                    //     require('../config').default.production
                    //   }api/v1/post/edit`,
                    //   {
                    //     method: 'POST',
                    //     headers: {
                    //       'Content-Type': 'application/json',
                    //       Authorization: `Bearer ${Token}`,
                    //     },
                    //     body: JSON.stringify({
                    //       post_id: data.postId,
                    //       description: this.state.description,
                    //     }),
                    //   },
                    // );
                    console.log('reponse');
                  },
                );
              }}>
              <View
                style={{
                  width: '90%',
                  borderRadius: 5,
                  height: 35,
                  justifyContent: 'center',
                  backgroundColor: '#0C91CF',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
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

const styles = StyleSheet.create({
  TextWithNavigation: {
    color: 'black',
    backgroundColor: 'white',
    width: '100%',
    fontSize: 17,
    paddingLeft: '4%',
    paddingBottom: 20,
  },
  modalOptions: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  optionIcon: {
    paddingLeft: '3%',
    fontSize: 25,
  },
});

export default connect(
  mapStateToProps,
  {CreateUserDetails},
)(Chat);
