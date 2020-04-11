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
import Icon3 from 'react-native-vector-icons/Feather';
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors';
import {Header} from 'react-native-elements';
import MyHeader from '../Components/MyHeader';

import YesCategory from '../Assets/Images/YesCategory.png'
import NoFollower from '../Assets/Images/NoFollower.png'

export default class CategoryPosts extends PureComponent {
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
                    <Icon2 name="view-grid" color="white" size={28} />
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
              <View style={{paddingLeft:"4%"}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('CategoryList')}>
            
                  <View style={{height:40,width:40,justifyContent:"center"}}>
                  <Image source={YesCategory} style={{height:30,width:30,borderWidth:1}}></Image>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{paddingLeft:"2%"}}>
              <TouchableOpacity
               
                onPress={() => props.navigation.navigate('FollowersPosts')}>

                <View style={{height:40,width:50,justifyContent:"center"}}>
                  <Image source={NoFollower} style={{height:30,width:35,borderWidth:1}}></Image>
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

    // this.props.navigation.setParams({
    //   handleThis: async () => {
    //     console.log('users icon clicked', this.state.FollowersPosts);
    //     await this.setState(prevState => {
    //       return {
    //         FollowersPosts: !prevState.FollowersPosts,
    //       };
    //     });
    //     this.fetchdata();
    //     console.log('fetch data ran');
    //   },
    // });
  }

  componentWillUnmount() {
    // Remove the event listener

    this.focusListener.remove();
  }



  onPageRefresh = () => {
    this.fetchCategoryPosts();
  };

  render() {
    if (this.state.total > 0) {
      return (
        <React.Fragment>
          <ScrollView
          style={{ backgroundColor: '#F0F0F0'}}
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
    }
  }
}
