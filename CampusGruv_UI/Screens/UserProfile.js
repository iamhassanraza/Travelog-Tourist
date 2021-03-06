import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Button,
  ImageBackground,
  Platform,
  TextInput,
  TouchableHighlight,
  Linking,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
import Logo from '../Assets/Images/logo.png';
import IconFeather from 'react-native-vector-icons/Feather';
import MenuIcon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import IconWithText from '../Components/IconAndText';
const IconGrey = '#b4b8bf';
import data from '../data';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import FastImage from 'react-native-fast-image';

class UserProfile extends React.Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header:
        params.otherUserId === null ||
        params.otherUserId === params.currentUserId ? (
          <View style={{backgroundColor: '#0C91CF'}}>
            <View
              style={{
                height: 50,
                backgroundColor: '#0C91CF',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                {/* <FastImage
                  source={Logo}
                  style={{width: 150, alignSelf: 'flex-start', height: '90%'}}
                  resizeMode="contain"
                /> */}
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 21,
                    letterSpacing: 1.4,
                  }}>
                  Profile
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  padding: 2,
                  alignSelf: 'center',
                  right: 8,
                }}>
                <TouchableOpacity
                  onPress={
                    () => params.handleOtherThis()
                    //props.navigation.goBack()
                  }>
                  <MenuIcon
                    name="settings"
                    color="white"
                    fontWeight="bold"
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{backgroundColor: '#0C91CF'}}>
            <View
              style={{
                height: 50,
                backgroundColor: '#0C91CF',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <FastImage
                  source={Logo}
                  style={{width: 150, alignSelf: 'flex-start', height: '100%'}}
                  resizeMode="contain"
                />
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
                  <Icon name="arrow-back" color="white" size={28} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  padding: 2,
                  alignSelf: 'center',
                  right: 8,
                }}>
                <TouchableOpacity
                  onPress={
                    () => params.handleThis()
                    //props.navigation.goBack()
                  }>
                  <MenuIcon
                    name="menu"
                    color="white"
                    fontWeight="bold"
                    size={26}
                  />
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
      posts: [],
      followers: '  ',
      following: '  ',
      otherUserId: null,
      otherUserFirstName: null,
      otherUserLastName: null,
      otherUserDp: null,
      otherUserCampus: null,
      otherUserBio: null,
      active: 'posts',
      spinner: false,
      loadmore: false,
      pageNo: 1,
      isModalVisible: false,
      otherModalVisible: false,
      //followed: true,
      userFollowing: null,
      searchbox: '',
      isFollowing: null,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', async () => {
      // before the screen is focused
      userNavId = this.props.navigation.getParam('userNavId', null);
      userNavFirstName = this.props.navigation.getParam(
        'userNavFirstName',
        null,
      );
      userNavLastName = this.props.navigation.getParam('userNavLastName', null);
      userNavDp = this.props.navigation.getParam('userNavDp', null);
      userCampus = this.props.navigation.getParam('userCampus', null);
      userFollowing = this.props.navigation.getParam('userFollowing', null);
      userNavBio = this.props.navigation.getParam('userNavBio', null);
      userNavContact = this.props.navigation.getParam('userNavContact', null);
      userNavMajor = this.props.navigation.getParam('userNavMajor', null);

      await this.setState({
        otherUserId: userNavId,
        otherUserDp: userNavDp,
        otherUserFirstName: userNavFirstName,
        otherUserLastName: userNavLastName,
        otherUserCampus: userCampus,
        otherUserBio: userNavBio,
        otherUserMajor: userNavMajor,
        otherUserContact: userNavContact,
        userFollowing: userFollowing,
      });
      this.props.navigation.setParams({
        otherUserId: this.state.otherUserId,
        currentUserId: this.props.User.id,
        handleThis: () => this.toggleModal(),
        handleOtherThis: () => this.props.navigation.navigate('UserSettings'),
      });
      this.fetchdata(userNavId ? userNavId : this.props.User.id);
      this.fetchFollowData(userNavId ? userNavId : this.props.User.id);
    });
  }

  fetchRoomDetails = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${require('../config').default.production}api/v1/room/details`,
      {
        method: 'POST',
        body: JSON.stringify({
          room_type: 0,
          userArray: [this.state.otherUserId],
          name:
            this.state.otherUserFirstName + ' ' + this.state.otherUserLastName,
          profile_pic_url: this.state.otherUserDp,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    return JsonResponse[0].room_id;
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  fetchFollowData = async id => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const response = await fetch(
      `${
        require('../config').default.production
      }api/v1/follow/details?user_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const jsonresponse = await response.json();
    this.setState({
      followers: jsonresponse[0].followerCount,
      following: jsonresponse[0].followingCount,
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.setState({
      otherUserData: null,
    });
    this.focusListener.remove();
    //this.anotherFocusListener.remove();
  }

  mapArray = posts => {
    posts.map(post => {
      RNFetchBlob.config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache: true,
      })
        .fetch(
          'GET',
          post.postDetail.length > 0
            ? post.postDetail[0].image_url
            : 'https://travelog-pk.herokuapp.com/images/default.png',
          {
            //some headers ..
          },
        )
        .then(res => {
          if (posts.every(obj => obj.height)) {
            this.setState({loading: false});
          }

          Image.getSize(
            post.postDetail.length > 0
              ? post.postDetail[0].image_url
              : 'https://travelog-pk.herokuapp.com/images/default.png',
            (srcWidth, srcHeight) => {
              const width = Dimensions.get('window').width / 2 - 14;
              const ratio = width / srcWidth;
              const height = srcHeight * ratio;
              post['height'] = height;
            },
            error => {
              () => console.log(error);
            },
          );
        });

      return posts;
    });
  };

  loadmore = () => {
    const userId = this.state.otherUserId
      ? this.state.otherUserId
      : this.props.User.id;
    this.setState(
      previousState => {
        return {pageNo: previousState.pageNo + 1, loadmore: true};
      },
      async () => {
        let Response = null;

        const Token = await AsyncStorage.getItem('TOKEN');
        if (this.state.active === 'posts') {
          Response = await fetch(
            `${
              require('../config').default.production
            }api/v1/search/user?type=post&user_id=${userId}&page=${
              this.state.pageNo
            }`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            },
          );
        } else {
          Response = await fetch(
            `${
              require('../config').default.production
            }api/v1/fetch/saved/posts?page=${this.state.pageNo}&user_id=${
              this.props.User.id
            }`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            },
          );
        }

        const JsonResponse = await Response.json();
        if (parseInt(Response.status) === 401) {
          alert(JsonResponse.message);
        } else if (parseInt(Response.status) === 200) {
          this.setState(previousState => {
            // this.mapArray(JsonResponse.data);

            return {
              posts: [...previousState.posts, ...JsonResponse.data],
              total: JsonResponse.total,
              spinner: false,
              loadmore: false,
            };
          });
        }
      },
    );
  };

  async searchPost(text, userId) {
    const Token = await AsyncStorage.getItem('TOKEN');
    this.setState({spinner: true});
    const response = await fetch(
      `${
        require('../config').default.production
      }api/v1/search/user?type=post&user_id=${userId}&page=${
        this.state.pageNo
      }&description=${text}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const jsonresponse = await response.json();
    // this.mapArray(JsonResponse.data);

    this.setState({
      spinner: false,
      posts: jsonresponse.data,
      total: jsonresponse.total,
    });
  }

  componentWillUnmount() {
    this.setState({searchbox: ''});
  }

  fetchdata = async userId => {
    this.setState({spinner: true});
    if (this.state.active === 'posts') {
      const Token = await AsyncStorage.getItem('TOKEN');

      const response = await fetch(
        `${
          require('../config').default.production
        }api/v1/search/user?type=post&user_id=${userId}&page=${
          this.state.pageNo
        }`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const jsonresponse = await response.json();
      // this.mapArray(jsonresponse.data);

      this.setState({
        spinner: false,
        posts: jsonresponse.data,
        total: jsonresponse.total,
        isFollowing: jsonresponse.data[0]
          ? jsonresponse.data[0].isFollowing
            ? true
            : false
          : this.state.userFollowing,
      });
    } else {
      const Token = await AsyncStorage.getItem('TOKEN');
      const response = await fetch(
        `${
          require('../config').default.production
        }api/v1/fetch/saved/posts?page=${this.state.pageNo}&user_id=${
          this.props.User.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const jsonresponse = await response.json();
      // this.mapArray(jsonresponse.data);

      this.setState({
        spinner: false,
        posts: jsonresponse.data,
        total: jsonresponse.total,
      });
    }
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderPost = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
        <RenderCards
          posts={this.state.posts}
          loadMore={this.loadmore}
          loadstate={this.state.loadmore}
          totalPosts={this.state.total}
        />
      </View>
    );
  };

  renderNoPost = () => {
    return (
      <View style={{paddingTop: 30, height: '100%'}}>
        <NoPosts />
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={{height: 300}}>
        <UIActivityIndicator color={ThemeBlue} />
      </View>
    );
  };

  blockUser = async user_id => {
    alert('user blocked');
    // const Token = await AsyncStorage.getItem('TOKEN');
    // var Response = await fetch(
    //   `${require('../config').default.production}api/v1/user/action`,
    //   {
    //     method: 'POST',
    //     body: {
    //       action: 'block',
    //       apply_to: user_id,
    //     },
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${Token}`,
    //     },
    //   },
    // );
    // const responseJson = await Response.json();
    // console.log('block response', responseJson);
  };

  followButton = async id => {
    this.setState(prevState => ({
      isFollowing: !prevState.isFollowing,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    var Response = null;
    if (this.state.isFollowing) {
      Response = await fetch(
        `${
          require('../config').default.production
        }api/v1/user/follow?user_id=${id}`,
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
        }api/v1/user/unfollow?user_id=${id}`,
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
      console.log('400');
      alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 200) {
      console.log('200');
    } else {
      alert('something is wrong');
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  render() {
    let accountType = AsyncStorage.getItem('accountType');

    const {navigate} = this.props.navigation;
    navId = this.props.navigation.getParam('id', null);
    const postUserId = this.state.otherUserId
      ? this.state.otherUserId
      : this.props.User.id;
    const postUserFirstName = this.state.otherUserFirstName
      ? this.state.otherUserFirstName
      : this.props.User.first_name;
    const postUserLastName = this.state.otherUserLastName
      ? this.state.otherUserLastName
      : this.props.User.last_name;
    const postUserDp = this.state.otherUserDp
      ? this.state.otherUserDp
      : this.props.User.profile_pic_url;
    const postUserBio = this.state.otherUserBio
      ? this.state.otherUserBio
      : this.props.User.bio;
    const postUserMajor = this.state.otherUserMajor
      ? this.state.otherUserMajor
      : this.props.User.major;
    const postUserContact = this.state.otherUserContact
      ? this.state.otherUserContact
      : this.props.User.contact_no;
    const postUserCampus = this.state.otherUserCampus
      ? this.state.otherUserCampus
      : this.props.User.campus.description;
    return (
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (this.isCloseToBottom(nativeEvent)) {
            if (
              this.state.posts.length < this.state.total &&
              !this.state.loadmore
            ) {
              this.loadmore();
              console.log('Reached end of page');
            }
          }
        }}
        style={{backgroundColor: '#f9fdfe'}}>
        {/* <> */}

        {/* IMAGE and NAME  */}
        {/* <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingLeft: 10,
            paddingTop: 5,
            alignItems: 'center',
          }}>
          <FastImage
            source={
              postUserDp === '' || !postUserDp
                ? defaultAvatar
                : {
                    uri: postUserDp,
                    priority: FastImage.priority.normal,
                  }
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              elevation: 3,
              shadowOffset: {width: 1, height: 2},
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOpacity: 0.5,
            }}
          />
          <View style={{marginLeft: 10, width: '70%'}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#727272',
              }}>
              {postUserFirstName +
                ' ' +
                (postUserLastName === '' || !postUserLastName
                  ? ''
                  : `${postUserLastName.charAt(0)}.`)}
            </Text>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#727272'}}>
              {postUserCampus}
            </Text>
          </View>
        </View> */}
        {/* __________________________copied from user app________________________________________ */}

        <View style={{}}>
          <View style={{borderWidth: 1, borderColor: '#b3b5b4'}}>
            <ImageBackground
              source={{
                uri:
                  'https://cf.bstatic.com/images/hotel/max1280x900/183/183223496.jpg',
              }}
              style={styles.coverPhoto}>
              {postUserId === this.props.User.id ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                      alignSelf: 'flex-end',
                      padding: 8,
                    }}
                    onPress={async () => {
                      let accountType = await AsyncStorage.getItem(
                        'accountType',
                      );
                      {
                        accountType === 'user'
                          ? this.props.navigation.navigate('EditProfile')
                          : this.props.navigation.navigate('EditOrganization');
                      }
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        borderWidth: 1,
                        padding: 5,
                        backgroundColor: 'rgba(255,255,255,0.7)',

                        fontSize: 12,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        borderColor: '#ACACAC',
                        borderRadius: 8,
                      }}>
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : this.state.isFollowing !== null ? (
                <View style={{backgroundColor: 'white'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      marginTop: 8,
                      marginRight: 8,
                      //width: 80,
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      this.followButton(postUserId);
                    }}>
                    <Text
                      style={{
                        color: this.state.isFollowing ? ThemeBlue : '#ACACAC',
                        borderWidth: 1,
                        padding: 5,
                        fontWeight: 'bold',
                        fontSize: 12,
                        borderColor: this.state.isFollowing
                          ? ThemeBlue
                          : '#ACACAC',
                        borderRadius: 8,
                      }}>
                      {this.state.isFollowing ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{height: 35, backgroundColor: 'white'}} />
              )}
            </ImageBackground>
          </View>
          <View style={styles.logoButton}>
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: postUserDp,
                }}
                style={styles.logo}
              />
            </View>
            {/* __________________-----_________---____ */}

            {/* FOLLORWERS */}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                paddingLeft: 10,
                paddingTop: 5,
              }}>
              <Text
                style={{color: '#727272', fontSize: 18, fontWeight: 'bold'}}>
                {(this.state.total ?? 0) + '  '}
              </Text>
              <Text
                style={{color: '#B4B8BA', fontSize: 18, fontWeight: 'bold'}}>
                Tours{'  '}
              </Text>
              <Text
                style={{color: '#727272', fontSize: 18, fontWeight: 'bold'}}>
                {this.state.following + '  '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push('Followers', {
                    postUserId,
                    postUserFirstName,
                    postUserLastName,
                    postUserDp,
                    postUserCampus,
                    isFollowing: this.state.isFollowing,
                  });
                }}>
                <Text
                  style={{color: '#B4B8BA', fontSize: 18, fontWeight: 'bold'}}>
                  Followers{'  '}
                </Text>
              </TouchableOpacity>

              {/* ______________----______________-----_________ */}
            </View>
          </View>
          <View style={{marginTop: '2%', marginLeft: '5%'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {postUserFirstName}
            </Text>
            <Text style={styles.shortIntro}>{`${postUserBio}`}</Text>
          </View>

          <View style={{marginTop: '5%', marginLeft: '1%'}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('geo:' + 40.7127753 + ',' + -74.0059728)
              }>
              <IconWithText
                textstyle={{...styles.textstyle}}
                iconstyle={styles.iconstyle}
                name="map-marker"
                text={postUserMajor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${'030308313255'}`)}>
              <IconWithText
                textstyle={{
                  ...styles.textstyle,
                  textDecorationLine: 'underline',
                }}
                iconstyle={styles.iconstyle}
                name="phone"
                text={postUserContact}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`mailto:${this.props.screenProps.email}`)
              }>
              <IconWithText
                textstyle={{
                  ...styles.textstyle,
                  textDecorationLine: 'underline',
                }}
                iconstyle={styles.iconstyle}
                name="email"
                text={'Nomads@gmail.com'}
              />
            </TouchableOpacity>
          </View>

          {/* __________________________________________________________________ */}

          {/* Modal goes here */}

          <View>
            <Modal
              style={{
                margin: 0,
                //backgroundColor: 'white',
                flexDirection: 'row',
                // alignItems: 'flex-end',
              }}
              isVisible={this.state.isModalVisible}
              onBackdropPress={() => this.setState({isModalVisible: false})}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                    paddingBottom: 20,
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                  }}>
                  <Icon
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
                {/* <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 30,
                  borderTopRightRadius: 23,
                  borderTopLeftRadius: 23,
                }}>
                <Icon
                  name="cancel"
                  onPress={() => this.setState({isModalVisible: false})}
                  style={{
                    flex: 0.65,
                    paddingLeft: 5,
                    fontSize: 20,
                    paddingTop: 4,
                    color: IconGrey,
                  }}
                />
                <View
                  style={{
                    flex: 10,
                    alignItems: 'center',
                    backgroundColor: 'white',
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
                </View>
              </View> */}

                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    onPress={async () => {
                      this.setState({isModalVisible: false});
                      room_id = await this.fetchRoomDetails();
                      this.props.navigation.navigate('chat', {
                        room_id,
                        room_type: 'personal',
                        name: postUserFirstName + ' ' + postUserLastName,
                      });
                    }}
                    style={{
                      color: 'black',
                      backgroundColor: 'white',
                      textAlign: 'center',
                      width: '100%',
                      fontSize: 17,
                      paddingBottom: 20,
                    }}>
                    Message user
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    onPress={() => {
                      this.setState({isModalVisible: false});
                      this.blockUser(postUserId);
                    }}
                    style={{
                      color: 'black',
                      backgroundColor: 'white',
                      textAlign: 'center',
                      width: '100%',
                      fontSize: 17,
                      paddingBottom: 20,
                    }}>
                    Block user
                  </Text>
                </View>
              </View>
            </Modal>
          </View>

          {/* <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
            {this.state.followers + '  '}
          </Text> */}
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.push('Following', {
                postUserId,
                postUserFirstName,
                postUserLastName,
                postUserDp,
                postUserCampus,
                isFollowing: this.state.isFollowing,
              });
            }}>
            <Text style={{color: '#B4B8BA', fontSize: 13, fontWeight: 'bold'}}>
              Following
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* SEARCH AND POST */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingLeft: 5,
            borderBottomWidth: 0.5,
            borderBottomColor: 'silver',
            backgroundColor: '#f9fdfe',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#C4C4C4',
              width: '65%',
              marginLeft: 0,
              borderRadius: 12,

              height: '75%',
            }}>
            <MenuIcon
              name="search"
              color="#C4C4C4"
              size={18}
              style={{paddingLeft: Platform.OS == 'ios' ? 5 : 3}}
            />
            <TextInput
              style={{
                width: '100%',
                fontSize: 15,
                color: '#ACACAC',
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: Platform.OS == 'ios' ? 5 : 3,
                height: Platform.OS == 'ios' ? 40 : 35,
              }}
              placeholder="Search posts"
              value={this.state.searchbox}
              onChangeText={searchbox => {
                this.setState({searchbox});
                this.searchPost(searchbox, postUserId);
              }}
            />
          </View>

          {postUserId === this.props.User.id ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginLeft: 0,
                alignItems: 'center',
                height: '70%',
                paddingRight: '3%',
                paddingLeft: '1%',
              }}>
              <Text
                onPress={() => {
                  this.setState({active: 'posts', pageNo: 1}, () => {
                    this.fetchdata(postUserId);
                  });
                }}
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: this.state.active === 'posts' ? '#0C91CF' : '#B4B8BA',
                }}>
                Posts{' '}
              </Text>
              <View
                style={{
                  height: 20,
                  width: 2,
                  borderColor: '#B4B8BA',
                  borderWidth: 1,
                  backgroundColor: '#B4B8BA',
                }}
              />
              <Text
                onPress={() => {
                  this.setState({active: 'saves', pageNo: 1}, () => {
                    this.fetchdata(postUserId);
                  });
                }}
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: this.state.active === 'saves' ? '#0C91CF' : '#B4B8BA',
                }}>
                {' '}
                Saves
              </Text>
            </View>
          ) : null}
        </View>

        {this.state.total === undefined || this.state.total === null
          ? // {this.state.spinner
            this.renderLoading()
          : this.state.total === 0
          ? this.renderNoPost()
          : this.renderPost()}
      </ScrollView>
      /* </> */
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  coverPhoto: {
    height: Dimensions.get('window').height / 4,
  },
  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginLeft: '5%',
    width: '30%',
    marginTop: -30,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#b3b5b4',
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '65%',
    borderWidth: 0,
  },
  followButton: {
    height: 35,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: ThemeBlue,
    alignSelf: 'center',
    borderRadius: 5,
  },
  shortIntro: {
    marginTop: '2%',
    fontSize: 14,
    marginRight: '5%',
    color: '#6b6b69',
  },
});

export default connect(
  mapStateToProps,
  null,
)(UserProfile);
