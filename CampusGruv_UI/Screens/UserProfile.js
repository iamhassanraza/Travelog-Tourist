import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
import Logo from '../Assets/Images/logo.png';
import IconFeather from 'react-native-vector-icons/Feather';
import MenuIcon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
const IconGrey = '#b4b8bf';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';

class UserProfile extends React.Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header:
        params.otherUserId === null ||
        params.otherUserId === params.currentUserId ? (
          <View style={{backgroundColor: '#1192d1'}}>
            <View
              style={{
                height: 50,
                backgroundColor: '#1192d1',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={Logo}
                  style={{width: 150, alignSelf: 'flex-start', height: '90%'}}
                  resizeMode="contain"
                />
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
                    name="more-vertical"
                    color="white"
                    fontWeight="bold"
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{backgroundColor: '#1192d1'}}>
            <View
              style={{
                height: 50,
                backgroundColor: '#1192d1',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <Image
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
                    name="more-vertical"
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
      total: '  ',
      followers: '  ',
      following: '  ',
      otherUserId: null,
      otherUserFirstName: null,
      otherUserLastName: null,
      otherUserDp: null,
      otherUserCampus: null,
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
      await this.setState({
        otherUserId: userNavId,
        otherUserDp: userNavDp,
        otherUserFirstName: userNavFirstName,
        otherUserLastName: userNavLastName,
        otherUserCampus: userCampus,
        userFollowing: userFollowing,
      });
      this.props.navigation.setParams({
        otherUserId: this.state.otherUserId,
        currentUserId: this.props.User.id,
        handleThis: () => this.toggleModal(),
        handleOtherThis: () => this.toggleOtherModal(),
      });
      this.fetchdata(userNavId ? userNavId : this.props.User.id);
      console.log('will focus');
      this.fetchFollowData(userNavId ? userNavId : this.props.User.id);
    });
  }

  fetchRoomDetails = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${require('../config').default.production}api/v1/room/details?user_id=${
        this.state.otherUserId
      }`,
      {
        method: 'GET',
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

  toggleOtherModal = () => {
    this.setState({otherModalVisible: !this.state.otherModalVisible});
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

  loadmore = () => {
    userId = this.state.otherUserId
      ? this.state.otherUserId
      : this.props.User.id;
    this.setState(
      previousState => {
        return {pageNo: previousState.pageNo + 1, loadmore: true};
      },
      async () => {
        const Token = await AsyncStorage.getItem('TOKEN');
        const Response = await fetch(
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

        const JsonResponse = await Response.json();
        if (parseInt(Response.status) === 401) {
          alert(JsonResponse.message);
        } else if (parseInt(Response.status) === 200) {
          this.setState(previousState => {
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
    this.setState({
      spinner: false,
      posts: jsonresponse.data,
    });
  }

  componentWillUnmount() {
    this.setState({searchbox: ''});
  }

  fetchdata = async userId => {
    this.setState({spinner: true});
    if (this.state.active === 'posts') {
      // const userId = await AsyncStorage.getItem('USER_ID');
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
      console.log('json xyz == >', jsonresponse);
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
        `${require('../config').default.production}api/v1/fetch/saved/posts`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const jsonresponse = await response.json();
      console.log(jsonresponse, 'res res res');
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
      <View style={{backgroundColor: '#f9fdfe'}}>
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
    console.log('no post');
    return (
      <View style={{paddingTop: 30, height: '100%'}}>
        <NoPosts />
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={{marginTop: 5}}>
        <ContentLoader
          height={450}
          width={820}
          speed={0.2}
          height={Dimensions.get('window').height * 1}>
          <Rect x="10" y="10" rx="5" ry="5" width="185" height="200" />
          <Rect x="200" y="10" rx="5" ry="5" width="200" height="200" />
          <Rect x="10" y="220" rx="5" ry="5" width="185" height="200" />
          <Rect x="200" y="220" rx="5" ry="5" width="200" height="200" />
          <Rect x="10" y="430" rx="5" ry="5" width="185" height="200" />
          <Rect x="200" y="430" rx="5" ry="5" width="200" height="200" />
          <Rect x="10" y="640" rx="5" ry="5" width="185" height="200" />
          <Rect x="200" y="640" rx="5" ry="5" width="200" height="200" />
        </ContentLoader>
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

  render() {
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
    const postUserCampus = this.state.otherUserCampus
      ? this.state.otherUserCampus
      : this.props.User.campus.description;
    return (
      <ScrollView style={{backgroundColor: '#f9fdfe'}}>
        {/* EDIT PROFILE BUTTON */}
        {postUserId === this.props.User.id ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                marginTop: 5,
                alignSelf: 'flex-end',
                padding: 5,
              }}
              onPress={() => {
                this.props.navigation.navigate('EditProfile');
              }}>
              <Text
                style={{
                  color: '#ACACAC',
                  borderWidth: 0.5,
                  padding: 5,
                  alignSelf: 'center',
                  borderColor: '#ACACAC',
                  borderRadius: 10,
                }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                marginTop: 5,
                alignSelf: 'flex-end',
                padding: 2,
              }}
              onPress={async () => {
                await AsyncStorage.clear();
                this.props.screenProps.rootNavigation.navigate('Login');
                console.log('Logged Out');
              }}>
              <Text
                style={{
                  color: '#ACACAC',
                  borderWidth: 0.5,
                  padding: 5,
                  alignSelf: 'center',
                  borderColor: '#ACACAC',
                  borderRadius: 10,
                }}>
                Logout
              </Text>
            </TouchableOpacity> */}
          </View>
        ) : this.state.isFollowing !== null ? (
          <View style={{backgroundColor: 'white'}}>
            <TouchableOpacity
              style={{
                marginTop: 5,
                //marginRight: 1,
                width: 80,
                //borderWidth: 1,
                justifyContent: 'center',
                alignSelf: 'flex-end',
                flexDirection: 'row',
              }}
              onPress={() => {
                this.followButton(postUserId);
              }}>
              <Text
                style={{
                  color: this.state.isFollowing ? ThemeBlue : 'grey',
                  borderWidth: 0.5,
                  //width: '100%',
                  padding: 5,
                  borderColor: this.state.isFollowing ? ThemeBlue : 'grey',
                  borderRadius: 10,
                }}>
                {this.state.isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{height: 40}} />
        )}
        {/* IMAGE and NAME  */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingLeft: 10,
            alignItems: 'center',
          }}>
          <Image
            source={
              postUserDp === '' || !postUserDp
                ? defaultAvatar
                : {
                    uri: postUserDp,
                  }
            }
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              elevation: 3,
              shadowOffset: {width: 5, height: 5},
              shadowColor: 'red',
              shadowOpacity: 0.5,
            }}
          />
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#727272'}}>
              {postUserFirstName + ' ' + postUserLastName.charAt(0) + '.'}
            </Text>
            <Text style={{fontSize: 13, color: '#727272'}}>
              {postUserCampus}
            </Text>
          </View>
        </View>

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

          {/* THE OTHER MODAL GOES HERE */}

          <Modal
            style={{
              margin: 0,
              //backgroundColor: 'white',
              flexDirection: 'row',
              // alignItems: 'flex-end',
            }}
            isVisible={this.state.otherModalVisible}
            onBackdropPress={() => this.setState({otherModalVisible: false})}>
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
                  justifyContent: 'space-between',
                  paddingBottom: 30,
                  borderTopRightRadius: 23,
                  borderTopLeftRadius: 23,
                }}>
                <Icon
                  name="cancel"
                  onPress={() => this.setState({otherModalVisible: false})}
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
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 20,
                      fontWeight: 'bold',
                      borderTopWidth: 2,
                      borderTopColor: 'rgba(196,196,196,0.5)',
                      // borderTopColor: IconGrey,
                    }}>
                    Profile actions
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                }}>
                <Text
                  onPress={async () => {
                    this.setState({otherModalVisible: false});
                    await AsyncStorage.clear();
                    this.props.screenProps.rootNavigation.navigate('Login');
                    console.log('Logged Out');
                  }}
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    width: '100%',
                    fontSize: 17,
                    paddingBottom: 40,
                  }}>
                  Logout
                </Text>
              </View>
            </View>
          </Modal>
        </View>

        {/* FOLLORWERS */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingLeft: 10,
            paddingTop: 5,
          }}>
          <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
            {this.state.total + '  '}
          </Text>
          <Text style={{color: '#B4B8BA', fontSize: 13, fontWeight: 'bold'}}>
            Posts{'  '}
          </Text>
          <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
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
            <Text style={{color: '#B4B8BA', fontSize: 13, fontWeight: 'bold'}}>
              Followers{'  '}
            </Text>
          </TouchableOpacity>
          <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
            {this.state.followers + '  '}
          </Text>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

        {/* SEARCH AND POST */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingLeft: 5,
            backgroundColor: 'white',
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
              // paddingTop: '2%',
              // paddingLeft: '2%',
              height: '75%',
            }}>
            <Icon
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
              placeholder="Search"
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
                  this.setState({active: 'posts'}, () => {
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
                  this.setState({active: 'saves'}, () => {
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

        {/* {this.state.total === 0 ? <View style={{height:"70%"}}><NoPosts></NoPosts></View> : <Text>Loader</Text>}
{this.state.total > 0 ? <View style={{paddingTop: 10}}>
          <RenderCards posts={this.state.posts}></RenderCards>
        </View> : <Text>Loader>>></Text>} */}
        {this.state.spinner
          ? this.renderLoading()
          : this.state.total === 0
          ? this.renderNoPost()
          : this.renderPost()}
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  null,
)(UserProfile);
