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
import Logo from '../Assets/Images/logo.png'
import PostCard from '../Components/PostCard';
import CrossIcon from 'react-native-vector-icons/Entypo';
import ContentLoader, {Rect} from 'react-content-loader/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import PeopleIcon from 'react-native-vector-icons/FontAwesome5'
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors'
import { Header } from 'react-native-elements';
import MyHeader from '../Components/MyHeader';

export default class HomeScreen extends PureComponent {

  static navigationOptions = (props) => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        //<MyHeader params={params} navigation={props.navigation} />
        Platform.OS=='ios'?
        <View style={{backgroundColor:'#1192d1'}}>
        <View style={{height:50, marginTop:Platform.OS=='ios'? 32:0,flexDirection: 'row', backgroundColor: '#1192d1', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row',  flex: 10 }}>
                <View style={{ marginLeft: '2%', flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Searching')}
                        >
                        <View style={{ height: 30, padding: 0, flexDirection: 'row', alignItems: 'center', width: 250, backgroundColor: '#F0F0F0', borderRadius: 10 }}>
                            <View style={{ marginLeft: '2%' }}>
                                <Icon
                                    name="search"
                                    color="#1192d1"
                                    size={20}
                                    />
                            </View>
                            <View style={{ height: 20 }}>
                                <Image
                                    source={Logo}
                                    style={{ width: 150, alignSelf: 'flex-start', height: '100%' }}
                                    resizeMode="contain"
                                    />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 5}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CategoryList')}>
                        <Icon2
                            name="view-grid"
                            color="white"
                            size={28}
                            />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{  flex: 1, }}>
                <TouchableOpacity style={{paddingRight:5}} onPress={() => params.handleThis()}>
                    <PeopleIcon name="users" color="white" size={20} />
                </TouchableOpacity>
            </View>
       </View>
  </View>
        :
        <View style={{height:50,flexDirection: 'row', backgroundColor: '#1192d1', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 10 }}>
                <View style={{ marginLeft: '2%', flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Searching')}
                        >
                        <View style={{ height: 30, padding: 0, flexDirection: 'row', alignItems: 'center', width: 250, backgroundColor: '#F0F0F0', borderRadius: 10 }}>
                            <View style={{ marginLeft: '2%' }}>
                                <Icon
                                    name="search"
                                    color="#1192d1"
                                    size={20}
                                    />
                            </View>
                            <View style={{ height: 20 }}>
                                <Image
                                    source={Logo}
                                    style={{ width: 150, alignSelf: 'flex-start', height: '100%' }}
                                    resizeMode="contain"
                                    />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ justifyContent:"space-between", alignItems: 'center', flex: 4, flexDirection:'row'}}>
                <View style={{marginLeft: 5}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CategoryList')}>
                        <Icon2
                            name="view-grid"
                            color="white"
                            size={28}
                            />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{paddingRight:5}} onPress={() => params.handleThis()}>
                    <PeopleIcon name="users" color="white" size={20} />
                </TouchableOpacity>
            </View>
       </View>
      )
    }
  }
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
    this.setState({posts: [], loading: true, total: undefined, FollowersPosts:false}, () => {
      this.fetchdata();
    });
  };

  loadmore = () => {
    if ( this.props.navigation.getParam('CategoryID', 'undefined') === 'undefined'){
      this.setState(
        previousState => {
          return {pageNo: previousState.pageNo + 1, loadmore: true};
        },
        async () => {
          console.log('calling load more api');
          const Token = await AsyncStorage.getItem('TOKEN');
          const Response = await fetch(
            `https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_all&page=${this.state.pageNo}`,
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

    }


    

    else{
      this.setState(
        previousState => {
          return {pageNo: previousState.pageNo + 1, loadmore: true};
        },
        async () => {
          console.log('calling load more api');
          const Token = await AsyncStorage.getItem('TOKEN');
          const Response = await fetch(
            `https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
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
          console.log(JsonResponse)
  
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
  this.setState({posts: [], loading: true, total: undefined})
 console.log('fetchcateogyr post chalra hai fetch kr rha')
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
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
      console.log('none');
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
    
    if (
      this.props.navigation.getParam('CategoryID', 'undefined') === 'undefined'
    ) {
      console.log('fetch data is running now1111',this.state.FollowersPosts)
      const Token = await AsyncStorage.getItem('TOKEN');
      this.setState({
        loading: true,
      });

      if(this.state.FollowersPosts){
        console.log("Poooooooooooooooooonnnnnnnnnnnnnn");
        fetch(
          `https://campus-gruv-heroku.herokuapp.com/api/v1/follower/posts`,
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
      }

  else {
      fetch(
        `https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_all&page=${this.state.pageNo}`,
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
    }}
    // else if (this.state.FollowersPosts){
    //   console.log("Followers ki posten dikhaao bhaeeeeeeeeeeeeeeee");
    // }
    
    else {
      console.log('fetch data is running now333333',this.state.FollowersPosts)
        this.fetchCategoryPosts();
    
     
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', () => {
      // The screen is focused
      this.fetchdata();
    });

    this.props.navigation.setParams({
      handleThis: async () => {
        console.log('users icon clicked',this.state.FollowersPosts)
        await this.setState(prevState => {
          return {
            FollowersPosts: !prevState.FollowersPosts
          } 
        })
        this.fetchdata();
        console.log('fetch data ran')
      }
  });

  }

  componentWillUnmount() {
    // Remove the event listener

    this.focusListener.remove();
  
  }

  render() {
    const catid = this.props.navigation.getParam('CategoryID', 'undefined');
    // const catname = this.props.navigation.getParam('CategoryName', 'undefi');
    console.log(catid, '============== categoryyy idddd =========');
    // this.setState({Category: catid});

    if (this.state.total > 0) {
      return (
        <React.Fragment>
          {/* <View style={{height: 60 }}>
            <Button title={'Cencel filter'} onPress={()=>{ this.props.navigation.setParams({CategoryID:'undefined'})}}></Button>
          </View> */}
          {this.props.navigation.getParam('CategoryID', 'undefined') ===
          'undefined' ? this.state.FollowersPosts ? (
            <View style={{  backgroundColor: '#F0F0F0'}}>

           
            <Text
              onPress={ async () => {
                await this.setState({posts:[],total:undefined,FollowersPosts:false});
                this.fetchdata();
              }}
              style={{
                margin: 6,
                padding: 2,
                paddingLeft: 5,
                borderWidth: 1,
                borderColor:ThemeBlue,
                borderRadius: 6,
                fontWeight: 'bold',
                alignSelf: 'flex-end',
                fontSize: 15,
                color:ThemeBlue
              }}>
              Clear Followers Post{' '}
              <CrossIcon
                name="circle-with-cross"
                size={15}
                style={{borderWidth: 1, alignSelf: 'center',color:ThemeBlue}}></CrossIcon>
            </Text>
            </View>
          ) : null : (
            <View style={{  backgroundColor: '#F0F0F0'}}>

           
            <Text
              onPress={ async () => {
                await this.setState({posts:[],total:undefined})
                await this.props.navigation.setParams({CategoryID:'undefined'})
                this.fetchdata()
              }}
              style={{
                margin: 6,
                padding: 2,
                paddingLeft: 5,
                borderWidth: 1,
                borderColor:ThemeBlue,
                borderRadius: 6,
                fontWeight: 'bold',
                alignSelf: 'flex-end',
                fontSize: 15,
                color:ThemeBlue
              }}>
              Clear Filter{' '}
              <CrossIcon
                name="circle-with-cross"
                size={15}
                style={{borderWidth: 1, alignSelf: 'center',color:ThemeBlue}}></CrossIcon>
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
                posts= {this.state.posts}
                totalPosts = {this.state.total}
                loadMore = {this.loadmore}
                loadstate = {this.state.loadmore}
              ></RenderCards>
              {/* <View
                style={{
                  backgroundColor: '#F0F0F0',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {this.state.loadmore ? (
                  <ActivityIndicator
                    size={40}
                    color="#1192d1"></ActivityIndicator>
                ) : (
                  null
                  // <Text
                  //   style={{
                  //     alignSelf: 'center',
                  //     color: '#1192d1',
                  //     backgroundColor: 'white',
                  //     padding: '2%',
                  //     borderColor: '#1192d1',
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
            <Rect x="10" y="10" rx="5" ry="5" width="185" height="220" />
            <Rect x="200" y="10" rx="5" ry="5" width="200" height="280" />
            <Rect x="10" y="240" rx="5" ry="5" width="185" height="250" />
            <Rect x="200" y="300" rx="5" ry="5" width="200" height="280" />
            {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                    <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
          </ContentLoader>
        </View>
      );
    }
  }
}
