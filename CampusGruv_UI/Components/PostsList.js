import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import PostCard from './PostCard';

import ContentLoader, {Rect} from 'react-content-loader/native';
import {withNavigation} from 'react-navigation';

class Test1 extends PureComponent {
  state = {
    posts: [],
    refreshing: false,
  };

  onPageRefresh = () => {
    this.setState({posts: [], refreshing: true}, () => {
      this.fetchdata();
    });
  };

  fetchdata = () => {
    fetch("${require('../config').default.production}api/v1/post/all", {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1NCwiaWF0IjoxNTc2MTMzNzQwfQ.f6hcEx-YKAcIaUJM8ZdH66iWahJafbLEzFEFwvLagE8',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          posts: responseJson,
          refreshing: false,
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      this.fetchdata();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    // {this.state.posts[0].users?  console.log(this.state.posts[0].users.first_name) : console.log('console')}
    if (this.state.posts[0]) {
      console.log(this.state.posts.ke, '================ posts ===========');
      const column1Data = this.state.posts.filter((item, i) => i % 2 === 0);
      const column2Data = this.state.posts.filter((item, i) => i % 2 === 1);

      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onPageRefresh}
            />
          }
          style={{}}>
          <View
            style={{
              height: '100%',
              flexDirection: 'row',
              backgroundColor: '#F0F0F0',
            }}>
            <SafeAreaView style={{flex: 1}}>
              <FlatList
                data={column1Data}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <PostCard
                      categoryName="New Category"
                      description={item.description}
                      style={{}}
                      name={item.users.first_name}
                      title={item.title}
                      views={item.view_count}
                      imageurl={
                        item.postDetail.length > 0
                          ? item.postDetail[0].image_url
                          : 'https://travelog-pk.herokuapp.com/images/default.png'
                      }>
                      {' '}
                    </PostCard>
                  );
                }}
                keyExtractor={item => item.tour_id}
              />
            </SafeAreaView>
            <SafeAreaView style={{flex: 1}}>
              <FlatList
                data={column2Data}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <PostCard
                      categoryName="New Category"
                      description={item.description}
                      name={item.users.first_name}
                      title={item.title}
                      views={item.view_count}
                      imageurl={
                        item.postDetail.length > 0
                          ? item.postDetail[0].image_url
                          : 'https://travelog-pk.herokuapp.com/images/default.png'
                      }>
                      {' '}
                    </PostCard>
                  );
                }}
                keyExtractor={item => item.tour_id}
              />
            </SafeAreaView>
          </View>
        </ScrollView>
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

export default withNavigation(Test1);
