import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet,
  AsyncStorage,
  PermissionsAndroid,
  Dimensions,
  AppState,
  Button,
  Platform,
  StatusBar,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {ThemeConsumer, Header} from 'react-native-elements';
import {Container, Item, Content, Input} from 'native-base';
import Comment from '../Components/Comment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ThemeBlue} from '../Assets/Colors';
import Modal from 'react-native-modal';
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import TextEncoding from 'text-encoding';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';

import NoLike from '../Assets/Images/NoLike.png';
import NoSave from '../Assets/Images/NoSave.png';
import YesLike from '../Assets/Images/YesLike.png';
import YesSave from '../Assets/Images/YesSave.png';
import FastImage from 'react-native-fast-image';
import TimeAgo from 'react-native-timeago';

const IconGrey = '#b4b8bf';
var {width, height} = Dimensions.get('window');

//AndroidKeyboardAdjust.setAdjustPan();

class PostDetail extends Component {
  static navigationOptions = props => {
    return {
      header: (
        <Header
          centerComponent={{
            text: 'POST',
            style: {color: '#FFF', fontWeight: 'bold'},
          }}
          leftComponent={
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </TouchableOpacity>
          }
        />
      ),
    };
  };

  state = {
    comments: this.props.navigation.getParam('PostData', 'no comments')
      .comments,
    currentComment: null,
    dp: this.props.navigation.getParam('PostData', 'no dp').dp,
    username: this.props.navigation.getParam('PostData', 'no username')
      .username,
    liked: this.props.navigation.getParam('PostData', 'no like status')
      .likeStatus,
    saved: this.props.navigation.getParam('PostData', 'no save status')
      .saveStatus,
    userFollowing: this.props.navigation.getParam(
      'PostData',
      'no follow status',
    ).userFollowing,
    isModalVisible: false,
    deleteModalVisible: false,
    createdAt: this.props.navigation.getParam('PostData', null).createdAt,
    description: this.props.navigation.getParam('PostData', 'no save status')
      .description,
    editDescText: this.props.navigation.getParam('PostData', 'no save status')
      .description,
    postId: this.props.navigation.getParam('PostData', 'no save status').postId,
    postUserId: this.props.navigation.getParam('PostData', 'no save status')
      .userId,

    imageurl: this.props.navigation.getParam('PostData', 'nothing to render')
      ?.uri,
  };

  componentDidMount() {
    Image.getSize(
      this.state.imageurl,
      (srcWidth, srcHeight) => {
        // const maxHeight = Dimensions.get('window').height / 2;
        // const maxWidth = Dimensions.get('window').width / 2;
        const width = Dimensions.get('window').width;
        const ratio = width / srcWidth;
        const height = srcHeight * ratio;

        this.setState({width: width, height: height});
      },
      error => {
        () => console.log(error);
      },
    );

    const {navigation} = this.props;
    this.willFocusListener = navigation.addListener('willFocus', async () => {
      this.props.screenProps.changeStatusBar({
        color: 'white',
        contentType: 'default',
      });
    });

    this.willBlurListener = navigation.addListener('willBlur', async () => {
      this.props.screenProps.changeStatusBar({
        color: ThemeBlue,
        contentType: 'light-content',
      });
    });

    this.incrementView();
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
    this.willBlurListener.remove();
  }

  incrementView = async () => {
    const DATA = this.props.navigation.getParam(
      'PostData',
      'nothing to render',
    );
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${require('../config').default.production}api/v1/view/count?post_id=${
        DATA.postId
      }`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
  };

  changeCurrentCommentState = comment => {
    this.setState({
      currentComment: comment,
    });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  createPDF = async postId => {
    this.setState({isModalVisible: false});
    await fetch(
      `${
        require('../config').default.production
      }api/v1/generate/pdf?post_id=${postId}`,
    );
    Linking.openURL(
      `${
        require('../config').default.production
      }api/v1/download/pdf?post_id=${postId}`,
    );
  };

  sharePost = (first_name, postId) => {
    let url =
      Platform.OS === 'android'
        ? `https://www.campusgruv.com/post/${postId}`
        : `campusgruv://post/${postId}`;
    let text = `Checkout this post by ${first_name}: \n for android: https://www.campusgruv.com/post/${postId} \n for iOS: campusgruv://post/${postId}`;

    // if (Platform.OS === 'ios') text = text.concat(url);

    const options = {
      title: 'share via',
      message: text,
      // url: url,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  deletePost = async postId => {
    const Token = await AsyncStorage.getItem('TOKEN');
    var Response = null;
    Response = await fetch(
      `${require('../config').default.production}api/v1/post/delete`,
      {
        method: 'POST',
        body: JSON.stringify({
          post_id: this.state.postId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    if (JsonResponse.result === 1) {
      this.props.navigation.navigate('HomeScreen', {newPost: true});
    } else {
      alert(
        'Post was not deleted. Try again or check your internet connection',
      );
    }
  };

  renderHeader = (
    userdp,
    postId,
    first_name,
    last_name,
    image_URL,
    userId,
    postTitle,
  ) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: Platform.OS == 'ios' ? 38 : 0,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 11,
            marginBottom: 5,
            marginTop: 5,
          }}>
          <View>
            <BackIcon
              name="ios-arrow-back"
              onPress={() => this.props.navigation.goBack()}
              style={{
                marginRight: 8,
                fontSize: 28,
                color: IconGrey,
                paddingLeft: 3,
                paddingRight: 3,
              }}
            />
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row', marginLeft: 10, alignItems: 'center'}}
            onPress={() =>
              this.props.navigation.push('UserProfile', {
                userNavId: userId,
                userNavDp: userdp,
                userNavFirstName: first_name,
                userNavLastName: last_name,
                userFollowing: this.state.userFollowing,
              })
            }>
            <FastImage
              source={!userdp || userdp === '' ? defaultAvatar : {uri: userdp}}
              style={{width: 40, height: 40, borderRadius: 50}}
            />
            <Text style={{marginLeft: '7%', color: IconGrey}}>
              {first_name +
                ' ' +
                (last_name === '' || !last_name
                  ? ''
                  : last_name.charAt(0) + '.')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{marginRight: '3%', color: 'grey', borderWidth: 1}}>
            Edit Post
          </Text> */}

          {/* <Icon
            name={this.state.liked ? 'star' : 'star-outline'}
            style={{
              fontSize: 28,
              color: this.state.liked ? ThemeBlue : IconGrey,
              paddingRight: 3,
            }}
            onPress={() => {
              // this.setState(prevState => ({
              //   liked: !prevState.liked,
              // }));
              this.likePost(postId, userId);
            }}
          /> */}

          <TouchableOpacity
            onPress={() => {
              this.likePost(postId, userId);
            }}>
            <View style={{height: 40, width: 40, justifyContent: 'center'}}>
              {/* <FastImage
                source={this.state.liked ? YesLike : NoLike}
                style={{height: 25, width: 28}}
              /> */}
              {this.state.liked ? (
                <AntIcon name="star" color={ThemeBlue} size={30} />
              ) : (
                <AntIcon name="staro" color="grey" size={30} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.savePost(postId);
            }}>
            <View style={{height: 40, width: 40, justifyContent: 'center'}}>
              {/* <FastImage
                source={this.state.saved ? YesSave : NoSave}
                style={{height: 25, width: 25}}
              /> */}
              {this.state.saved ? (
                <IconFeather name="save" color={ThemeBlue} size={30} />
              ) : (
                <IconFeather name="save" color="grey" size={30} />
              )}
            </View>
          </TouchableOpacity>

          {/* <Icon
            name="content-save-outline"
            style={{
              fontSize: 28,
              paddingRight: 3,
              color: this.state.saved ? ThemeBlue : IconGrey,
            }}
            onPress={() => {
              this.savePost(postId);
            }}
          /> */}

          {/* <IconFeather
            name="send"
            style={{ fontSize: 25, color: IconGrey, paddingRight: 3 }}
            onPress={() =>
              this.sharePost(first_name, postTitle)
            }
          ></IconFeather> */}

          <View>
            <Icon
              name="dots-horizontal"
              style={{fontSize: 30, color: IconGrey, paddingRight: 3}}
              onPress={this.toggleModal}
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
                    <CrossIcon
                      name="cancel"
                      onPress={() => this.setState({isModalVisible: false})}
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 10,
                        fontSize: 20,
                        color: IconGrey,
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
                          borderTopColor: IconGrey,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginTop: 2,
                        }}>
                        More Options
                      </Text>
                      {/* </View> */}
                    </View>
                  </View>
                  {userId === this.props.User.id ? (
                    <View style={styles.modalOptions}>
                      <IconFeather name="edit" style={styles.optionIcon} />
                      <Text
                        onPress={() => {
                          this.setState({
                            isModalVisible: false,
                            editDescription: true,
                          });
                        }}
                        style={styles.TextWithNavigation}>
                        Edit post description
                      </Text>
                    </View>
                  ) : null}
                  {userId === this.props.User.id ? (
                    <View style={styles.modalOptions}>
                      <IconFeather name="delete" style={styles.optionIcon} />
                      <Text
                        onPress={() => {
                          this.setState({
                            isModalVisible: false,
                            deleteModalVisible: true,
                          });
                          // this.deletePost(postId);
                        }}
                        style={styles.TextWithNavigation}>
                        Delete post
                      </Text>
                    </View>
                  ) : null}

                  {userId === this.props.User.id ? null : (
                    <View style={styles.modalOptions}>
                      <IconFeather name="flag" style={styles.optionIcon} />
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
                    </View>
                  )}
                  <View style={styles.modalOptions}>
                    <IconFeather name="download" style={styles.optionIcon} />
                    <Text
                      onPress={() => this.createPDF(postId)}
                      style={styles.TextWithNavigation}>
                      Download post
                    </Text>
                  </View>

                  {/* <View style={styles.modalOptions}>
                    <IconFeather
                      name="download"
                      style={styles.optionIcon}></IconFeather>
                    <Text
                      onPress={() => this.downloadImage(image_URL)}
                      style={styles.TextWithNavigation}>
                      Download post image
                    </Text>
                  </View> */}

                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <Icon name="share-variant" style={styles.optionIcon} />
                    <Text
                      onPress={() => this.sharePost(first_name, postId)}
                      style={styles.TextWithNavigation}>
                      Share post
                    </Text>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderImage = (image, width, height) => {
    const screenWidth = Dimensions.get('window').width;
    const ratio = screenWidth / width;
    const imgheight = height * ratio;
    console.log('imageeee', screenWidth, imgheight);
    return (
      <View style={{}}>
        <FastImage
          resizeMode="contain"
          source={{uri: this.state.imageurl}}
          style={{
            width: screenWidth,
            // height: Dimensions.get('window').height / 2,
            height: imgheight ?? 300,
          }}
        />
      </View>
    );
  };

  renderTitle = (title, views, likes, createdAt) => {
    return (
      <View
        style={{
          marginTop: 5,
          marginLeft: '3%',
          marginRight: '3%',
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
        }}>
        <View style={{width: '74%'}}>
          <Text
            selectable={true}
            style={{fontSize: 20, fontWeight: '400', paddingRight: '2%'}}>
            {title}
          </Text>
        </View>

        <View style={{width: '12%'}}>
          <TimeAgo
            style={{
              textAlign: 'center',
              lineHeight: 12,
              color: 'grey',
              fontSize: 11,
            }}
            time={this.state.createdAt}
          />
        </View>

        <View style={{marginLeft: '1%', width: '5%'}}>
          <ViewsIcon color="grey" name="thumb-up" style={{fontSize: 17}} />
          <Text
            style={{
              fontSize: 9,
              color: 'grey',
              marginTop: -2,
              alignSelf: 'center',
            }}>
            {likes}
          </Text>
        </View>

        <View style={{width: '5%', marginLeft: '1%'}}>
          <ViewsIcon color="grey" name="eye" style={{fontSize: 17}} />
          <Text
            style={{
              fontSize: 9,
              color: 'grey',
              marginTop: -2,
              alignSelf: 'center',
            }}>
            {views}
          </Text>
        </View>
      </View>
    );
  };

  renderDescription = description => {
    return (
      <View
        style={{
          marginLeft: '3%',
          flexDirection: 'row',
          marginTop: 20,
          marginRight: '5%',
        }}>
        <Text
          selectable={true}
          style={{
            // width: '85%',
            fontSize: 17,
            marginTop: '1%',
            marginBottom: 10,
          }}>
          {this.state.description}
        </Text>
      </View>
    );
  };

  renderAddComment = (dp, postId, userId) => {
    return (
      <View
        style={{
          marginBottom:
            Platform.OS == 'ios'
              ? Dimensions.get('window').height > 800
                ? 20
                : 10
              : 10,

          flexDirection: 'row',
          backgroundColor: 'white',
          borderTopColor: 'grey',
          paddingTop: 5,
          alignItems: 'center',
        }}>
        <View style={{marginLeft: '2%', width: 30, height: 30}}>
          <FastImage
            source={{uri: this.props.User.profile_pic_url}}
            style={{width: '100%', borderRadius: 50, height: '100%'}}
          />
        </View>
        <Item
          style={{
            marginLeft: 5,
            borderBottomWidth: 0,
            width: Dimensions.get('window').width - 100,
          }}>
          <Input
            value={this.state.currentComment}
            getRef={input => {
              this.commentInput = input;
            }}
            multiline={true}
            placeholder="Add a comment"
            style={{
              borderWidth: 0.3,
              padding: 2,
              borderRadius: 10,
              borderColor: 'grey',
            }}
            onChangeText={text => {
              this.changeCurrentCommentState(text);
            }}
          />
        </Item>
        <View
          style={{
            width: 60,
            height: 40,
            paddingRight: '2%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.postComment(postId, userId);
            }}>
            <Text
              style={{
                fontSize: 18,
                color:
                  this.state.currentComment === null ||
                  this.state.currentComment === ''
                    ? '#e8d7d5'
                    : ThemeBlue,
                //paddingLeft: '2%',
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderAllComments = dp => {
    console.log('comments', this.state.comments[0]);
    return (
      <View style={{marginTop: 10}}>
        <View
          style={{
            marginLeft: '4%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'grey', fontSize: 12}}>Comments</Text>
          <CrossIcon style={{}} name="expand-more" />
        </View>
        <FlatList
          style={{marginTop: '1%'}}
          data={this.state.comments}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Comment
                deleteComment={this.deleteComment}
                commentId={item.id}
                userId={item.user_id}
                postUserId={this.state.postUserId}
                dp={item.user.profile_pic_url}
                name={
                  item.user.first_name +
                  ' ' +
                  (item.user.last_name === '' || !item.user.last_name
                    ? ''
                    : item.user.last_name.charAt('0') + '.')
                }
                //comment={new TextDecoder("utf-8").decode(item.description.data)}
                //comment={bin2string(item.description.data)}
                comment={item.description}
                key={index}
              />
            );
          }}
        />
      </View>
    );
  };

  postComment = async (postId, postUserId) => {
    Keyboard.dismiss();
    if (this.state.currentComment && this.state.currentComment != '') {
      const Token = await AsyncStorage.getItem('TOKEN');
      const Response = await fetch(
        `${require('../config').default.production}api/v1/comment/create`,
        {
          method: 'POST',
          body: JSON.stringify({
            post_id: postId,
            user_id: this.props.User.id,
            post_created_by: postUserId,
            description: this.state.currentComment,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const JsonResponse = await Response.json();
      if (parseInt(Response.status) === 400) {
        alert(JsonResponse.message);
      } else if (parseInt(Response.status) === 200) {
        const comments = this.state.comments;
        comments.push({
          ...JsonResponse,
          user: {
            first_name: this.props.User.first_name,
            last_name: this.props.User.last_name,
            profile_pic_url: this.props.User.profile_pic_url,
          },
        });
        this.setState({
          comments: comments,
          currentComment: '',
        });
      } else {
        alert(
          'something is wrong. Try again or check your internet connection',
        );
      }
    } else {
      alert("comment can't be empty");
    }
  };

  deleteComment = commentId => {
    var comments = this.state.comments.filter(
      comment => commentId != comment.id,
    );
    this.setState({comments: comments});
  };

  likePost = async (postId, postUserId) => {
    this.setState(prevState => ({
      liked: !prevState.liked,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    var Response = null;
    if (this.state.liked) {
      Response = await fetch(
        `${require('../config').default.production}api/v1/post/like`,
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: this.props.User.id,
            post_id: postId,
            post_created_by: postUserId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
    } else {
      Response = await fetch(
        `${require('../config').default.production}api/v1/post/unlike`,
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: this.props.User.id,
            post_id: postId,
            post_created_by: postUserId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
    }
    const JsonResponse = await Response.json();
    if (parseInt(Response.status) === 400) {
      alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 201) {
      // alert(JsonResponse.message);
    } else {
      alert('something is wrong');
    }
  };

  savePost = async postId => {
    this.setState(prevState => ({
      saved: !prevState.saved,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    var Response = null;
    if (this.state.saved) {
      Response = await fetch(
        `${
          require('../config').default.production
        }api/v1/user/save/post?post_id=${postId}&user_id=${this.props.User.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
    } else {
      Response = await fetch(
        `${
          require('../config').default.production
        }api/v1/user/unsave/post?post_id=${postId}&user_id=${
          this.props.User.id
        }`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
    }
    const JsonResponse = await Response.json();
    if (parseInt(Response.status) === 400) {
      alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 200) {
    } else {
      alert('something is wrong');
    }
  };

  static navigationOptions = {
    header: null,
  };
  //style={{height: Dimensions.get('window').height-150}}
  render() {
    const data = this.props.navigation.getParam(
      'PostData',
      'nothing to render',
    );
    console.log('data', data);
    return (
      <>
        {/* {Platform.OS === 'ios' ? <StatusBar barStyle="default" /> : null} */}
        <Container style={{}}>
          {/* <Modal
            style={{margin: 0}}
            isVisible={this.state.deleteModalVisible}
            onBackdropPress={() => this.setState({deleteModalVisible: false})}>
            <View
              style={{
                backgroundColor: 'white',
                marginHorizontal: '10%',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <View>
                <Text
                  // style={styles.cancelText}
                  onPress={() => this.setState({deleteModalVisible: false})}>
                  Cancel
                </Text>
              </View>
            </View>
          </Modal> */}
          {Platform.OS === 'android' ? (
            <StatusBar barStyle="dark-content" backgroundColor="white" />
          ) : null}
          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior="padding"
              keyboardVerticalOffset={
                Dimensions.get('window').height > 800 ? 30 : 15
              }>
              <Content
                style={{
                  marginTop: Platform.OS === 'ios' ? '-9%' : 0,
                }}>
                {this.renderHeader(
                  data.userAvatar,
                  data.postId,
                  data.first_name,
                  data.last_name,
                  data.uri,
                  data.userId,
                  data.title,
                )}
                {this.renderImage(data.uri, data.width, data.height)}
                {this.renderTitle(
                  data.title,
                  data.views,
                  data.likes,
                  data.createdAt,
                )}
                {this.renderDescription(data.description)}
                {this.state.comments[0]
                  ? this.renderAllComments(data.userAvatar, data.comments)
                  : null}
              </Content>
              {this.renderAddComment(data.userAvatar, data.postId, data.userId)}
            </KeyboardAvoidingView>
          ) : (
            <>
              <Content
                style={{
                  marginTop: Platform.OS === 'ios' ? '-9%' : 0,
                }}>
                {this.renderHeader(
                  data.userAvatar,
                  data.postId,
                  data.first_name,
                  data.last_name,
                  data.uri,
                  data.userId,
                  data.title,
                )}
                {this.renderImage(data.uri, data.width, data.height)}
                {this.renderTitle(data.title, data.views, data.likes)}
                {this.renderDescription(data.description)}
                {this.state.comments[0]
                  ? this.renderAllComments(data.userAvatar, data.comments)
                  : null}
              </Content>
              {this.renderAddComment(data.userAvatar, data.postId, data.userId)}
            </>
          )}
          {this.state.editDescription ? (
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
              <CrossIcon
                name="cancel"
                onPress={() => this.setState({editDescription: false})}
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
                    value={this.state.editDescText}
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
                        editDescText: text,
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
                      description: this.state.editDescText,
                      editDescription: false,
                    },
                    async () => {
                      const Token = await AsyncStorage.getItem('TOKEN');

                      let response = await fetch(
                        `${
                          require('../config').default.production
                        }api/v1/post/edit`,
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${Token}`,
                          },
                          body: JSON.stringify({
                            post_id: data.postId,
                            description: this.state.description,
                          }),
                        },
                      );
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
          {this.state.deleteModalVisible && (
            <View
              style={{
                alignItems: 'center',
                height: height / 7,
                position: 'absolute',
                top: height / 2 - height / 14,
                left: width / 2 - width / 4,
                backgroundColor: '#d6d4ce',
                width: width / 2,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  position: 'absolute',
                  top: '10%',
                  width: '80%',
                  textAlign: 'center',
                }}>
                Are you sure you want to delete this post? This action can be
                undone.
              </Text>
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  borderTopWidth: 0.5,
                  borderTopColor: 'gray',
                }}>
                <Button
                  title="Cancel"
                  onPress={() => this.setState({deleteModalVisible: false})}
                />
                <Button
                  title="Delete"
                  onPress={() => {
                    this.setState({deleteModalVisible: false});
                    this.deletePost();
                  }}
                />
              </View>
            </View>
          )}
          {/* <Modal
            style={{ backgroundColor: 'black', borderWidth: 5}}
            isVisible={this.state.deleteModalVisible}
            onBackdropPress={() => this.setState({deleteModalVisible: false})}>
            <View
              style={{
                backgroundColor: 'white',
                marginHorizontal: '10%',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <View>
                <Text
                  // style={styles.cancelText}
                  onPress={() => this.setState({deleteModalVisible: false})}>
                  Cancel
                </Text>
              </View>
            </View>
          </Modal> */}
        </Container>
      </>
    );
  }
}

//style={{height: Dimensions.get('window').height-215}}

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

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  null,
)(PostDetail);
