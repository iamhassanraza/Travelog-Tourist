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
import PostCard from '../Components/PostCard';

import ContentLoader, {Rect} from 'react-content-loader/native';
import RenderCards from '../Components/RenderCards';

export default class HomeScreen extends PureComponent {
  state = {
    posts: [],
    refreshing: false,
    loading:false
  };

  onPageRefresh = () => {
    this.setState({ posts:[],loading: true}, () => {
      this.fetchdata();
    });
  };

  fetchdata = () => {
    this.setState({
        loading:false
    })
    fetch('https://campus-gruv-heroku.herokuapp.com/api/v1/post/all', {
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
          loading:false
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
    if (this.state.loading===false) {
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
