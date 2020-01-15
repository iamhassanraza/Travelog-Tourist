import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Button,
} from 'react-native';
import PostCard from '../Components/PostCard';
import CrossIcon from 'react-native-vector-icons/Entypo';
import ContentLoader, {Rect} from 'react-content-loader/native';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import {ThemeBlue} from '../Assets/Colors'

export default class HomeScreen extends PureComponent {
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
  };

  onPageRefresh = () => {
    this.setState({posts: [], loading: true, total: undefined}, () => {
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
      const Token = await AsyncStorage.getItem('TOKEN');
      this.setState({
        loading: true,
      });
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
    } else {

        this.fetchCategoryPosts();
    
     
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', () => {
      // The screen is focused
      this.fetchdata();
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
          'undefined' ? null : (
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
