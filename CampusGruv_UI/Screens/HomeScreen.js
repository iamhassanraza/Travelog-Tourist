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

export default class HomeScreen extends PureComponent {
  state = {
    posts: [],
    totalPosts: null,
    refreshing: false,
    loading: false,
    CategoryPosts: undefined,
    Category: 'undefined',
    Category_Name: 'undefined',
  };

  onPageRefresh = () => {
    this.setState({posts: [], loading: true}, () => {
      this.fetchdata();
    });
  };

  fetchCategoryPosts = async () => {
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
      this.setState({posts: JsonResponse.data});
    }
  };

  fetchdata = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    this.setState({
      loading: false,
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
        console.log(responseJson)
        this.setState({
          posts: responseJson.data,
          totalPosts: responseJson.total,
          refreshing: false,
          loading: false,
          Category: 'undefined'
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('willFocus', () =>  {
      // The screen is focused

      if (this.state.Category === 'undefined') {
        this.fetchdata();
      } else {
        this.fetchCategoryPosts();
      }
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }


                   // For Cancelling the category and rerender Home


  // renderCancelCategory = () => {
  //   return (
  //     <View style={{flexDirection: 'row', alignItems: 'center', height: 32}}>
  //       <Text
  //         style={{
  //           backgroundColor: '#1192d1',
  //           paddingLeft: '2%',
  //           paddingRight: '2%',
  //           borderRadius: 10,
  //           color: 'white',
  //           paddingTop: '0.2%',
  //           height: 25,
  //         }}>
  //         {this.state.Category_Name}
  //       </Text>
  //       <CrossIcon
  //         name="cancel"
  //         style={{fontSize: 25, color: '#1192d1'}}
  //         onPress={() => {
           
  //           this.fetchdata();
  //         }}></CrossIcon>
  //     </View>
  //   );
  // };

  render() {
    const catid = this.props.navigation.getParam('CategoryID', 'undefined');
    const catname = this.props.navigation.getParam('CategoryName', 'undefi');
    this.setState({Category: catid, Category_Name: catname});
 


    if (this.state.totalPosts > 0 ) {
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
    } else if (this.state.totalPosts === 0) {
      return <Text>hello jee no posts</Text> 
    }
    else {
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
