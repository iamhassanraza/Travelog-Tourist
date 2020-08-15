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
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors';
import {Header} from 'react-native-elements';
import MyHeader from '../Components/MyHeader';
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
import YesFollower from '../Assets/Images/YesFollower.png';
import FastImage from 'react-native-fast-image';

export default class FolllowersPosts extends PureComponent {
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
                  onPress={() => props.navigation.navigate('HomeScreen')}
                  style={{position: 'absolute', right: 5}}>
                  {/* <PeopleIcon name="users" color="#00527a" size={20} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={YesFollower}
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
                  onPress={() => props.navigation.navigate('HomeScreen')}
                  style={{position: 'absolute', right: 5}}>
                  {/* <PeopleIcon name="users" color="#00527a" size={20} /> */}
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      source={YesFollower}
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
    FollowersPosts: true,
  };

  onPageRefresh = () => {
    this.setState(
      {
        posts: [],
        loading: true,
        pageNo: 1,
        refreshing: true,
        total: undefined,
        FollowersPosts: false,
      },
      () => {
        this.fetchdata();
      },
    );
  };

  loadmore = () => {
    this.setState(
      previousState => {
        return {pageNo: previousState.pageNo + 1, loadmore: true};
      },
      async () => {
        console.log('calling load more api');
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
          }api/v1/follower/posts?campus_id=${campus}&page=${this.state.pageNo}`,
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
  };

  fetchdata = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    var campus;
    if (await AsyncStorage.getItem('otherCampus')) {
      campus = await AsyncStorage.getItem('otherCampus');
    } else {
      campus = await AsyncStorage.getItem('CAMPUS_ID');
    }
    this.setState({
      loading: true,
    });
    fetch(
      `${
        require('../config').default.production
      }api/v1/follower/posts?campus_id=${campus}`,
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
        //console.log('home --------------------',responseJson.data[0])

        this.setState({
          posts: responseJson.data,
          total: responseJson.total,
          refreshing: false,
          loading: false,
          Category: 'undefined',
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', () => {
      // The screen is focused
      this.fetchdata();
    });

    this.props.navigation.setParams({
      handleThis: async () => {
        console.log('users icon clicked', this.state.FollowersPosts);
        await this.setState(prevState => {
          return {
            FollowersPosts: !prevState.FollowersPosts,
          };
        });
        this.fetchdata();
        console.log('fetch data ran');
      },
    });
  }

  componentWillUnmount() {
    // Remove the event listener

    this.focusListener.remove();
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  render() {
    if (this.state.total > 0) {
      return (
        <React.Fragment>
          {/* <ScrollView
            onScroll={({nativeEvent}) => {
              if (this.isCloseToBottom(nativeEvent)) {
                if (this.state.posts.length < this.state.total) {
                  this.loadmore();
                }
              }
            }}
            style={{backgroundColor: '#f9fdfe'}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onPageRefresh}
              />
            }> */}
          <View style={{flex: 1}}>
            <RenderCards
              posts={this.state.posts}
              totalPosts={this.state.total}
              loadMore={this.loadmore}
              loadstate={this.state.loadmore}
              onRefresh={this.onPageRefresh}
              refreshState={this.state.refreshing}
            />
          </View>
          {/* </ScrollView> */}
        </React.Fragment>
      );
    } else if (this.state.total === 0) {
      return (
        <View
          style={{
            paddingTop: '45%',
            height: '100%',
            backgroundColor: '#f9fdfe',
          }}>
          <NoPosts />
        </View>
      );
    } else {
      return <UIActivityIndicator color={ThemeBlue} />;
    }
  }
}
