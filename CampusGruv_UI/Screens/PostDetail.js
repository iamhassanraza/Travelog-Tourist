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
  Platform,
} from 'react-native';
import {ThemeConsumer, Header} from 'react-native-elements';
import {Container, Item, Content, Input} from 'native-base';
import Comment from '../Components/Comment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
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

const IconGrey = '#b4b8bf';

//AndroidKeyboardAdjust.setAdjustPan();

class PostDetail extends Component {
  static navigationOptions = (props) => {
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
    post_id: undefined,
  };

  componentDidMount() {
    this.incrementView();
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

  changeCurrentCommentState = (comment) => {
    this.setState({
      currentComment: comment,
    });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  createPDF = async (postId) => {
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

  sharePost = (first_name, postTitle) => {
    let text = `Checkout this post by ${first_name}: \n`;
    if (Platform.OS === 'android')
      text = text.concat(`${require('../config').default.production}Android`);
    else text = text.concat('http://itunes.apple.com/app/id1453977874');

    const options = {
      title: 'share via',
      message: text,
      //url: `app://`,
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
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
              }}></BackIcon>
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
            <Image
              source={{uri: userdp}}
              style={{width: 40, height: 40, borderRadius: 50}}></Image>
            <Text style={{marginLeft: '7%', color: IconGrey}}>
              {first_name + ' ' + last_name}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{marginRight: '3%', color: 'grey', borderWidth: 1}}>
            Edit Post
          </Text> */}

          <Icon
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
            }}></Icon>

          <Icon
            name="content-save-outline"
            style={{
              fontSize: 28,
              paddingRight: 3,
              color: this.state.saved ? ThemeBlue : IconGrey,
            }}
            onPress={() => {
              // this.setState(prevState => ({
              //   saved: !prevState.saved,
              // }));
              this.savePost(postId);
            }}></Icon>

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
              onPress={this.toggleModal}></Icon>

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
                      justifyContent: 'space-between',
                      paddingBottom: 30,
                      borderTopRightRadius: 23,
                      borderTopLeftRadius: 23,
                    }}>
                    <CrossIcon
                      name="cancel"
                      onPress={() => this.setState({isModalVisible: false})}
                      style={{
                        flex: 0.65,
                        paddingLeft: 5,
                        fontSize: 20,
                        paddingTop: 4,
                        color: IconGrey,
                      }}></CrossIcon>
                    <View
                      style={{flex: 10, alignItems: 'center', paddingTop: 3}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          borderTopWidth: 2,
                          borderTopColor: IconGrey,
                        }}>
                        More Options
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalOptions}>
                    <Icon
                      name="flag-variant-outline"
                      style={styles.optionIcon}></Icon>
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
                      Report Post
                    </Text>
                  </View>

                  <View style={styles.modalOptions}>
                    <IconFeather
                      name="download"
                      style={styles.optionIcon}></IconFeather>
                    <Text
                      onPress={() =>
                        this.createPDF(
                          postId,
                          // first_name,
                          // last_name,
                          // image_URL,
                          // userdp,
                          // postTitle,
                        )
                      }
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

                  {/* <View style={styles.modalOptions}>
                    <Icon name="share-variant" style={styles.optionIcon}></Icon>
                    <Text
                      onPress={() => alert('Share Post')}
                      style={styles.TextWithNavigation}>
                      Share Post
                    </Text>
                  </View> */}
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderImage = (image) => {
    console.log(image, 'image', this.props.height);
    return (
      <View style={{}}>
        <Image
          source={{uri: image}}
          resizeMode="center"
          style={{width: '100%', height: 350}}></Image>
      </View>
    );
  };

  renderTitle = (title, views) => {
    return (
      <View
        style={{
          marginLeft: '3%',
          marginRight: '3%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 25, fontWeight: '600'}}>{title}</Text>
        </View>

        <View style={{}}>
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

  renderDescription = (description) => {
    return (
      <View style={{marginLeft: '3%', marginRight: '5%'}}>
        <Text
          style={{
            fontSize: 17,
            marginTop: '1%',
            color: 'grey',
            marginBottom: 10,
          }}>
          {description}
        </Text>
      </View>
    );
  };

  renderAddComment = (dp, postId, userId) => {
    return (
      <View
        style={{
          marginBottom: Platform.OS == 'ios' ? 20 : 0,
          flexDirection: 'row',
          borderTopWidth: 0.3,
          borderTopColor: 'grey',
          paddingTop: 5,
          paddingBottom: 5,
          alignItems: 'center',
        }}>
        <View style={{marginLeft: '2%', width: 40, height: 40}}>
          <Image
            source={{uri: this.props.User.profile_pic_url}}
            style={{width: '100%', borderRadius: 50, height: '100%'}}></Image>
        </View>
        <Item style={{width: Dimensions.get('window').width - 100}}>
          <Input
            value={this.state.currentComment}
            getRef={(input) => {
              this.commentInput = input;
            }}
            multiline={true}
            placeholder="Add a comment"
            style={{borderWidth: 0}}
            onChangeText={(text) => {
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
              //CALL API FOR COMMENT , USER ID ,POST ID , COMMENT DESCRIPTION
              this.postComment(postId, userId);
            }}>
            <Text
              style={{
                fontSize: 18,
                color: ThemeBlue,
                //paddingLeft: '2%',
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderAllComments = (dp) => {
    //console.log('coments', this.state.comments)
    return (
      <View style={{marginLeft: '4%'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'grey', fontSize: 12}}>Comments</Text>
          <CrossIcon style={{}} name="expand-more" />
        </View>
        <FlatList
          data={this.state.comments}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Comment
                dp={item.user.profile_pic_url}
                name={item.user.first_name}
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
    console.log('hello jee', this.state.currentComment);
    if (this.state.currentComment !== null || this.state.currentComment != '') {
      const Token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USER_ID');
      console.log('postid ------', postId);
      const Response = await fetch(
        `${require('../config').default.production}api/v1/comment/create`,
        {
          method: 'POST',
          body: JSON.stringify({
            post_id: postId,
            user_id: userId,
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
      console.log(JsonResponse, 'res res');
      if (parseInt(Response.status) === 400) {
        alert(JsonResponse.message);
      } else if (parseInt(Response.status) === 200) {
        alert('comment created');
        const comments = this.state.comments;
        comments.push({
          ...JsonResponse,
          user: {
            first_name: this.props.User.first_name,
            profile_pic_url: this.props.User.profile_pic_url,
          },
        });
        await this.setState({
          comments: comments,
          currentComment: '',
        });
      } else {
        alert('something went wrong');
      }
    } else {
      alert("comment can't be empty");
    }
  };

  likePost = async (postId, postUserId) => {
    this.setState((prevState) => ({
      liked: !prevState.liked,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    console.log('hello jeeeeeee user id', userId);
    console.log('post id is -----', postId);
    var Response = null;
    if (this.state.liked) {
      Response = await fetch(
        `${require('../config').default.production}api/v1/post/like`,
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
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
            user_id: userId,
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
    console.log(JsonResponse);
    if (parseInt(Response.status) === 400) {
      console.log('400');
      // alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 201) {
      console.log('200');
      // alert(JsonResponse.message);
    } else {
      alert('something is wrong');
    }
  };

  savePost = async (postId) => {
    this.setState((prevState) => ({
      saved: !prevState.saved,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    console.log('hello jeeeeeee user id', userId);
    console.log('post id is -----', postId);
    var Response = null;
    if (this.state.saved) {
      Response = await fetch(
        `${
          require('../config').default.production
        }api/v1/user/save/post?post_id=${postId}`,
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
        }api/v1/user/unsave/post?post_id=${postId}`,
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
    console.log(JsonResponse);
    if (parseInt(Response.status) === 400) {
      console.log('400');
      // alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 200) {
      console.log('200');
      // alert(JsonResponse.message);
    } else {
      alert('something is wrong');
    }
  };
  //style={{height: Dimensions.get('window').height-150}}
  render() {
    const data = this.props.navigation.getParam(
      'PostData',
      'nothing to render',
    );
    return (
      <>
        <Container>
          <Content style={{marginBottom: 10}}>
            {this.renderHeader(
              data.userAvatar,
              data.postId,
              data.first_name,
              data.last_name,
              data.uri,
              data.userId,
              data.title,
            )}
            {this.renderImage(data.uri)}
            {this.renderTitle(data.title, data.views)}
            {this.renderDescription(data.description)}
            {this.state.comments[0] ? (
              this.renderAllComments(data.userAvatar, data.comments)
            ) : (
              <View style={{height: 80, justifyContent: 'center'}}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 25,
                    opacity: 0.5,
                    alignSelf: 'center',
                  }}>
                  No comments yet!
                </Text>
              </View>
            )}
          </Content>
        </Container>
        {this.renderAddComment(data.userAvatar, data.postId, data.userId)}
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

mapStateToProps = (state) => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps, null)(PostDetail);
