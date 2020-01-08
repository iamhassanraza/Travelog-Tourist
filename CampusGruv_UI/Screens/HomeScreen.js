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
} from 'react-native';
import PostCard from '../Components/PostCard';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import ContentLoader, {Rect} from 'react-content-loader/native';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';

export default class HomeScreen extends PureComponent {
  state = {
    posts: [],
    refreshing: false,
    loading: false,
    CategoryPosts: undefined,
    Category: 'undefined',
    Category_Name: 'undefined',
    total: undefined,
  
  };

  onPageRefresh = () => {
    this.setState({posts: [], loading: true}, () => {
      this.fetchdata();
    });
  };

  fetchCategoryPosts = async () => {
    this.setState({posts: [],loading:true});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_category&category_id=${this.props.navigation.getParam(
        'CategoryID',
        'undefined',
      )}&page=1`,
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
      this.setState({posts: JsonResponse.data, total: JsonResponse.total,loading:false});
    }
  };

  fetchdata = async () => {
      if(this.props.navigation.getParam('CategoryID', 'undefined') === 'undefined'){
        
    const Token = await AsyncStorage.getItem('TOKEN');
    this.setState({
      loading: true,
    });
    fetch(
      'https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_all&page=1',
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
        console.log(responseJson,'asdasdasdasdasdas')

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
      else{
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
    this.setState({total:undefined,
    posts:[]})
  
  }



  render() {
    const catid = this.props.navigation.getParam('CategoryID', 'undefined');
    // const catname = this.props.navigation.getParam('CategoryName', 'undefi');
    console.log(catid,'============== categoryyy idddd =========')
    // this.setState({Category: catid});

    if (this.state.total > 0) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onPageRefresh}
            />
          }>
          <RenderCards posts={this.state.posts}></RenderCards>
        </ScrollView>
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
