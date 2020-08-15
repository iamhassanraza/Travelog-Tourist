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
import YesCategory from '../Assets/Images/YesCategory.png';
import NoFollower from '../Assets/Images/NoFollower.png';
import SearchIcon from '../Assets/Images/SearchIcon.png';
import FastImage from 'react-native-fast-image';

export default class CategoryPosts extends PureComponent {
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
                  // justifyContent: 'space-around',
                  flex: 1,
                }}>
                <View
                  style={{
                    // marginLeft: '5%',
                    height: 25,
                    position: 'absolute',
                    // top: 0,
                    // bottom: 0,
                    left: 0,
                    right: 0,
                    //alignItems: 'center',
                    justifyContent: 'center',
                    // left: Dimensions.get('window').width / 2,
                    flexDirection: 'row',
                    // alignSelf: 'center',
                    // justifyContent: 'center',
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
                      source={YesCategory}
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
                  // justifyContent: 'space-around',
                  flex: 1,
                }}>
                <View
                  style={{
                    // marginLeft: '5%',
                    height: 25,
                    position: 'absolute',
                    // top: 0,
                    // bottom: 0,
                    left: 0,
                    right: 0,
                    //alignItems: 'center',
                    justifyContent: 'center',
                    // left: Dimensions.get('window').width / 2,
                    flexDirection: 'row',
                    // alignSelf: 'center',
                    // justifyContent: 'center',
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
                      source={YesCategory}
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
        loading: true,
        refreshing: true,
        pageNo: 1,
        total: undefined,
        FollowersPosts: false,
      },
      () => {
        this.fetchCategoryPosts();
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
          }api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
            'CategoryID',
            'undefined',
          )}&page=${this.state.pageNo}&campus_id=${campus}`,
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

  fetchCategoryPosts = async () => {
    this.setState({posts: [], loading: true, total: undefined});
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
      }api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
        'CategoryID',
        'undefined',
      )}&page=${this.state.pageNo}&campus_id=${campus}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();

    if (parseInt(Response.status) === 401) {
      console.log('Error code status 401');
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
        refreshing: false,
        loadmore: false,
      });
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', () => {
      // The screen is focused
      this.fetchCategoryPosts();
    });
  }

  componentWillUnmount() {
    // Remove the event listener

    this.focusListener.remove();
  }

  // onPageRefresh = () => {
  //   this.fetchCategoryPosts();
  // };

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
              hideCategory={true}
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
