import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ActivityIndicator,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import Logo from '../Assets/Images/logo.png';
import PostCard from '../Components/PostCard';
import CrossIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors';
import {Header} from 'react-native-elements';
import MyHeader from '../Components/MyHeader';
import io from 'socket.io-client';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {connect} from 'react-redux';
import {connectSocket} from '../ReduxStore/Actions/index';
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
import NoCategory from '../Assets/Images/NoCategory.png';
import NoFollower from '../Assets/Images/NoFollower.png';
import SearchIcon from '../Assets/Images/SearchIcon.png';
import FastImage from 'react-native-fast-image';

class HomeScreen extends PureComponent {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header:
        //<MyHeader params={params} navigation={props.navigation} />
        Platform.OS == 'ios' ? (
          <View style={{backgroundColor: '#0C91CF'}}>
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                backgroundColor: '#0C91CF',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    height: 25,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <FastImage
                    source={Logo}
                    style={{
                      width: 150,
                      alignSelf: 'flex-start',
                      height: '100%',
                    }}
                    resizeMode="contain"
                  />
                </View>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Searching')}
                  style={{position: 'absolute', left: 8}}>
                  {/* <Icon2 name="view-grid" color="#00527a" size={28} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={SearchIcon}
                      style={{height: 25, width: 30}}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('CategoryList')}
                  style={{position: 'absolute', right: 60}}>
                  {/* <Icon2 name="view-grid" color="#00527a" size={28} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={NoCategory}
                      style={{height: 25, width: 30}}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('FollowersPosts')}
                  style={{position: 'absolute', right: 5}}>
                  {/* <PeopleIcon name="users" color="#00527a" size={20} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={NoFollower}
                      style={{height: 25, width: 30}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{backgroundColor: '#0C91CF'}}>
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                backgroundColor: '#0C91CF',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    height: 25,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <FastImage
                    source={Logo}
                    style={{
                      width: 150,
                      alignSelf: 'flex-start',
                      height: '100%',
                    }}
                    resizeMode="contain"
                  />
                </View>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Searching')}
                  style={{position: 'absolute', left: 8}}>
                  {/* <Icon2 name="view-grid" color="#00527a" size={28} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={SearchIcon}
                      style={{height: 25, width: 30}}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('CategoryList')}
                  style={{position: 'absolute', right: 50}}>
                  {/* <Icon2 name="view-grid" color="#00527a" size={28} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={NoCategory}
                      style={{height: 25, width: 30}}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('FollowersPosts')}
                  style={{position: 'absolute', right: 5}}>
                  {/* <PeopleIcon name="users" color="#00527a" size={20} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={NoFollower}
                      style={{height: 25, width: 30}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
    };
  };
  //   props.navigation.push('TabContainer', {
  //     categorySelected: true
  // })

  state = {
    posts: [],
    refreshing: false,
    loading: false,
    CategoryPosts: undefined,
    Category: 'undefined',
    Category_Name: 'undefined',
    total: undefined,
    pageNo: 1,
    loadmore: false,
    FollowersPosts: false,
  };

  onPageRefresh = () => {
    this.setState(
      {
        posts: [],
        pageNo: 1,
        loading: true,
        total: undefined,
        FollowersPosts: false,
      },
      () => {
        this.fetchdata();
      },
    );
  };

  loadmore = () => {
    if (
      this.props.navigation.getParam('CategoryID', 'undefined') === 'undefined'
    ) {
      this.setState(
        previousState => {
          return {pageNo: previousState.pageNo + 1, loadmore: true};
        },
        async () => {
          const Token = await AsyncStorage.getItem('TOKEN');
          var campus;
          if (await AsyncStorage.getItem('otherCampus')) {
            campus = await AsyncStorage.getItem('otherCampus');
          } else {
            campus = await AsyncStorage.getItem('CAMPUS_ID');
          }

          const Response = await fetch(
            `${
              require('../config').default.production
            }api/v1/search/post?type=post_all&page=${
              this.state.pageNo
            }&campus_id=${campus}`,
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
                loading: false,
                loadmore: false,
              };
            });
          }
        },
      );
    } else {
      this.setState(
        previousState => {
          return {pageNo: previousState.pageNo + 1, loadmore: true};
        },
        async () => {
          const Token = await AsyncStorage.getItem('TOKEN');
          const Response = await fetch(
            `${
              require('../config').default.production
            }api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
              'CategoryID',
              'undefined',
            )}&page=${this.state.pageNo}`,
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
                totl: JsonResponse.total,
                loading: false,
                loadmore: false,
              };
            });
          }
        },
      );
    }
  };

  fetchCategoryPosts = async () => {
    this.setState({posts: [], loading: true, total: undefined});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
        'CategoryID',
        'undefined',
      )}&page=${this.state.pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );

    const JsonResponse = await Response.json();

    if (parseInt(Response.status) === 401) {
    } else if (parseInt(Response.status) === 200) {
      console.log('Category aagyi yayyyy');
      // this.setState(previousState => {
      //   return {
      //     posts: [...previousState.posts, ...JsonResponse.data],
      //     totl: JsonResponse.total,
      //     loading: false,
      //     loadmore: false,
      //   };
      // });
      this.setState({
        posts: JsonResponse.data,
        total: JsonResponse.total,
        loading: false,
        loadmore: false,
      });
    }
  };

  fetchdata = async () => {
    console.log('fetch');
    if (
      this.props.navigation.getParam('CategoryID', 'undefined') === 'undefined'
    ) {
      const Token = await AsyncStorage.getItem('TOKEN');
      this.setState({
        loading: true,
      });

      if (this.state.FollowersPosts) {
        fetch(
          `${require('../config').default.production}api/v1/follower/posts`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        )
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            this.setState({
              posts: responseJson.data,
              total: responseJson.total,
              refreshing: false,
              loading: false,
              Category: 'undefined',
            });
          })
          .catch(err => console.log('error', err));
      } else {
        var campus;
        if (await AsyncStorage.getItem('otherCampus')) {
          campus = await AsyncStorage.getItem('otherCampus');
        } else {
          campus = await AsyncStorage.getItem('CAMPUS_ID');
        }
        fetch(
          `${
            require('../config').default.production
          }api/v1/search/post?type=post_all&page=${
            this.state.pageNo
          }&campus_id=${campus}`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        )
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            this.setState({
              posts: responseJson.data,
              total: responseJson.total,
              refreshing: false,
              loading: false,
              Category: 'undefined',
            });
          })
          .catch(err => console.log(err));
      }
    }
    // else if (this.state.FollowersPosts){
    //   console.log("Followers ki posten dikhaao bhaeeeeeeeeeeeeeeee");
    // }
    else {
      this.fetchCategoryPosts();
    }
  };

  async componentDidMount() {
    const {navigation} = this.props;
    if (this.props.screenProps.postDetail) {
      const postDetail = this.props.screenProps.postDetail[0];
      console.log('nav prpsssssss', postDetail);
      navigation.navigate('PostDetail', {
        PostData: {
          uri: postDetail.postDetail[0].image_url,
          title: postDetail.title,
          postId: postDetail.id,
          likeStatus: postDetail.userWiseLike[0] ? true : false,
          saveStatus: postDetail.userSavedPost[0] ? true : false,
          isFollowing: postDetail.isFollowing,
          userAvatar: postDetail.userdp,
          userId: postDetail.users.id,
          first_name: postDetail.users.first_name,
          last_name: postDetail.users.last_name,
          description: postDetail.description,
          comments: postDetail.comments,
          views: postDetail.view_count,
        },
      });
      console.log('here');
    }
    this.focusListener = navigation.addListener('willFocus', () => {
      // The screen is focused
      this.setState({
        pageNo: 1,
      });
      this.fetchdata();
    });

    //Socket connection goes here
    // const Token = await AsyncStorage.getItem('TOKEN');
    // this.socket = io('${require('../config').default.pro_chat}', { query: `token=${Token}`, transports: ['websocket'] });

    // this.socket.on('connect', () => {
    //   console.log('hello jee connection established')
    //   this.props.connectSocket(this.socket)
    // });
    // this.socket.on('connect_error', (err) => {
    //   console.log('hello jee error established',err)
    // });

    this.props.navigation.setParams({
      handleThis: async () => {
        await this.setState(prevState => {
          return {
            FollowersPosts: !prevState.FollowersPosts,
          };
        });
        this.fetchdata();
      },
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const catid = this.props.navigation.getParam('CategoryID', 'undefined');
    if (this.state.total > 0) {
      return (
        <>
          <React.Fragment>
            {/* <View style={{height: 60 }}>
            <Button title={'Cencel filter'} onPress={()=>{ this.props.navigation.setParams({CategoryID:'undefined'})}}></Button>
          </View> */}
            {this.props.navigation.getParam('CategoryID', 'undefined') ===
            'undefined' ? (
              this.state.FollowersPosts ? (
                <View style={{backgroundColor: '#f9fdfe'}}>
                  <Text
                    onPress={async () => {
                      await this.setState({
                        posts: [],
                        pageNo: 1,
                        total: undefined,
                        FollowersPosts: false,
                      });
                      this.fetchdata();
                    }}
                    style={{
                      margin: 6,
                      padding: 2,
                      paddingLeft: 5,
                      borderWidth: 1,
                      borderColor: ThemeBlue,
                      borderRadius: 6,
                      fontWeight: 'bold',
                      alignSelf: 'flex-end',
                      fontSize: 15,
                      color: ThemeBlue,
                    }}>
                    Clear Followers Post{' '}
                    <CrossIcon
                      name="circle-with-cross"
                      size={15}
                      style={{
                        borderWidth: 1,
                        alignSelf: 'center',
                        color: ThemeBlue,
                      }}
                    />
                  </Text>
                </View>
              ) : null
            ) : (
              <View style={{backgroundColor: '#f9fdfe'}}>
                <Text
                  onPress={async () => {
                    await this.setState({posts: [], total: undefined});
                    await this.props.navigation.setParams({
                      CategoryID: 'undefined',
                    });
                    this.fetchdata();
                  }}
                  style={{
                    margin: 6,
                    padding: 2,
                    paddingLeft: 5,
                    borderWidth: 1,
                    borderColor: ThemeBlue,
                    borderRadius: 6,
                    fontWeight: 'bold',
                    alignSelf: 'flex-end',
                    fontSize: 15,
                    color: ThemeBlue,
                  }}>
                  Clear Filter{' '}
                  <CrossIcon
                    name="circle-with-cross"
                    size={15}
                    style={{
                      borderWidth: 1,
                      alignSelf: 'center',
                      color: ThemeBlue,
                    }}
                  />
                </Text>
              </View>
            )}

            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onPageRefresh}
                />
              }>
              <View style={{flex: 1}}>
                <RenderCards
                  posts={this.state.posts}
                  totalPosts={this.state.total}
                  loadMore={this.loadmore}
                  loadstate={this.state.loadmore}
                />
                {/* <View
                style={{
                  backgroundColor: '#F0F0F0',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {this.state.loadmore ? (
                  <ActivityIndicator
                    size={40}
                    color="#0C91CF"></ActivityIndicator>
                ) : (
                  null
                  // <Text
                  //   style={{
                  //     alignSelf: 'center',
                  //     color: '#0C91CF',
                  //     backgroundColor: 'white',
                  //     padding: '2%',
                  //     borderColor: '#0C91CF',
                  //     borderWidth: 0.6,
                  //     borderRadius: 4,
                  //   }}
                  //   onPress={() => {
                  //     this.loadmore();
                  //   }}>
                  //   Load More Post
                  // </Text>
                )}
              </View> */}
              </View>
            </ScrollView>
          </React.Fragment>
        </>
      );
    } else if (this.state.total === 0) {
      return (
        <View
          style={{
            paddingTop: '45%',
            backgroundColor: '#f9fdfe',
            height: '100%',
          }}>
          <NoPosts />
        </View>
      );
    } else {
      return (
        <UIActivityIndicator color={ThemeBlue} />
        // <View style={{}}>
        //   <ContentLoader
        //     height={450}
        //     //width={820}
        //     speed={0.2}
        //     height={Dimensions.get('window').height * 1}>
        //     <Rect x="10" y="10" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="190" y="35" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="10" y="220" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="190" y="245" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="10" y="430" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="190" y="455" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="10" y="640" rx="5" ry="5" width="160" height="200" />
        //     <Rect x="190" y="665" rx="5" ry="5" width="160" height="200" />
        //   </ContentLoader>
        // </View>
      );
    }
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {socket: state.socket}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  {connectSocket},
)(HomeScreen);
