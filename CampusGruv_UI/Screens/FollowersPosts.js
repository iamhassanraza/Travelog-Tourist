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
import ContentLoader, {Rect} from 'react-content-loader/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors';
import {Header} from 'react-native-elements';
import MyHeader from '../Components/MyHeader';

export default class FolllowersPosts extends PureComponent {
  static navigationOptions = (props) => {
    const {params = {}} = props.navigation.state;
    return {
      header:
        //<MyHeader params={params} navigation={props.navigation} />
        Platform.OS == 'ios' ? (
          <View style={{backgroundColor: '#1192d1'}}>
            <View
              style={{
                height: 50,
                marginTop: Platform.OS == 'ios' ? 32 : 0,
                flexDirection: 'row',
                backgroundColor: '#1192d1',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', flex: 10}}>
                <View
                  style={{
                    marginLeft: '2%',
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Searching')}>
                    <View
                      style={{
                        height: 30,
                        padding: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 250,
                        backgroundColor: '#F0F0F0',
                        borderRadius: 10,
                      }}>
                      <View style={{marginLeft: '2%'}}>
                        <Icon name="search" color="#1192d1" size={20} />
                      </View>
                      <View style={{height: 20}}>
                        <Image
                          source={Logo}
                          style={{
                            width: 150,
                            alignSelf: 'flex-start',
                            height: '100%',
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 5}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('CategoryList')}>
                    <Icon2 name="view-grid" color="#00527a" size={28} />
                  </TouchableOpacity>
                </View>

                <View style={{marginLeft: '10%', marginTop: '0.5%'}}>
                  <TouchableOpacity
                    style={{paddingRight: 5}}
                    onPress={() => props.navigation.navigate('HomeScreen')}>
                    <PeopleIcon name="users" color="white" size={23} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              backgroundColor: '#1192d1',
              alignItems: 'center',
            }}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', flex: 10}}>
              <View
                style={{
                  marginLeft: '2%',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Searching')}>
                  <View
                    style={{
                      height: 30,
                      padding: 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 250,
                      backgroundColor: '#F0F0F0',
                      borderRadius: 10,
                    }}>
                    <View style={{marginLeft: '2%'}}>
                      <Icon name="search" color="#1192d1" size={20} />
                    </View>
                    <View style={{height: 20}}>
                      <Image
                        source={Logo}
                        style={{
                          width: 150,
                          alignSelf: 'flex-start',
                          height: '100%',
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 5}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('CategoryList')}>
                  <Icon2 name="view-grid" color="#00527a" size={28} />
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: '10%', marginTop: '0.5%'}}>
                <TouchableOpacity
                  style={{paddingRight: 5}}
                  onPress={() => props.navigation.navigate('HomeScreen')}>
                  <PeopleIcon name="users" color="white" size={20} />
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
      {posts: [], loading: true, total: undefined, FollowersPosts: false},
      () => {
        this.fetchdata();
      },
    );
  };

  loadmore = () => {
    this.setState(
      (previousState) => {
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
          this.setState((previousState) => {
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
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        //console.log('home --------------------',responseJson.data[0])

        this.setState({
          posts: responseJson.data,
          total: responseJson.total,
          refreshing: false,
          loading: false,
          Category: 'undefined',
        });
      })
      .catch((err) => console.log(err));
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
        await this.setState((prevState) => {
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

  render() {
    if (this.state.total > 0) {
      return (
        <React.Fragment>
          {/* <View style={{backgroundColor: '#F0F0F0'}}>
          <Text
            onPress={() => {
              this.setState({FolllowersPosts: false});
              
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
              }}></CrossIcon>
          </Text>
        </View>  */}
          <ScrollView
          style={{backgroundColor: '#F0F0F0'}}
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
                loadstate={this.state.loadmore}></RenderCards>
            </View>
          </ScrollView>
        </React.Fragment>
      );
    } else if (this.state.total === 0) {
      return (
        <View style={{paddingTop: '45%', height: '100%'}}>
          <NoPosts></NoPosts>
        </View>
      );
    } else {
      return (
        <View>
          <ContentLoader
            height={800}
            width={820}
            speed={0.2}>
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
    }
  }
}
