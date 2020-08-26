import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import PostCard from './PostCard';
import FastImage from 'react-native-fast-image';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UIActivityIndicator, MaterialIndicator} from 'react-native-indicators';
import MasonryList from 'react-native-masonry-list';

class RenderCards extends PureComponent {
  state = {
    onEndReachedCalledDuringMomentum: true,
    posts: this.props.posts,
  };
  loadMore = ({distanceFromEnd}) => {
    console.log('i ran');
    if (
      !this.state.onEndReachedCalledDuringMomentum &&
      this.props.posts.length < this.props.totalPosts
    ) {
      console.log('fetching');
      this.setState(
        {onEndReachedCalledDuringMomentum: true, refreshing: true},
        async () => {
          await this.props.loadMore();
          this.setState({refreshing: false});
        },
      );
    }
  };

  mapPosts = arr => {
    arr.forEach(function(data) {
      if (data.postDetail.length > 0) {
        const uri = data.postDetail[0].image_url;
        data['source'] = {};
        data.source['uri'] = data.postDetail[0]['image_url'];
        data.source.uri = uri;
      }
    });
    return arr;
  };

  render() {
    console.log('size', this.props.posts.length);
    const column1Data = this.props.posts.filter((item, i) => i % 2 === 0);
    const column2Data = this.props.posts.filter((item, i) => i % 2 === 1);
    return (
      <View>
        <View
          style={{
            height: '100%',
            flexDirection: 'row',
            backgroundColor: '#f9fdfe',
            flex: 1,
          }}>
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              ref={'flatlist'}
              style={{
                flex: 1,
                paddingTop: 5,
              }}
              // onContentSizeChange={() => {
              //   if (this.props?.newPost) {
              //     this.refs.flatlist.scrollToOffset({
              //       offset: 0,
              //       animated: true,
              //     });
              //     this.props?.toggleNewPost();
              //   }
              // }}
              // onRefresh={this.props.onRefresh}
              // refreshing={this.props.refreshState}
              scrollEnabled={false}
              // initialNumToRender={3}
              data={column1Data}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <PostCard
                    index={index}
                    hideCategory={this.props.hideCategory ?? false}
                    categoryName={item.postCategory.description}
                    categoryColor={item.postCategory.rgba_colors}
                    postId={item.id}
                    comments={item.comments}
                    userdp={item.users.profile_pic_url}
                    description={item.description}
                    first_name={item.users.first_name}
                    last_name={item.users.last_name}
                    userId={item.users.id}
                    userWiseLike={item.userWiseLike}
                    userSavedPost={item.userSavedPost}
                    isFollowing={item.isFollowing}
                    title={item.title}
                    views={item.view_count}
                    likes={item.likes_count}
                    createdAt={item.created_at}
                    height={
                      item.postDetail.length > 0 &&
                      item.postDetail[0].height != undefined
                        ? item.postDetail[0].height
                        : 200
                    }
                    width={
                      item.postDetail.length > 0 &&
                      item.postDetail[0].width != undefined
                        ? item.postDetail[0].width
                        : 200
                    }
                    imageurl={
                      item.postDetail.length > 0
                        ? item.postDetail[0].image_url
                        : 'https://travelog-pk.herokuapp.com/images/default.png'
                    }>
                    {' '}
                  </PostCard>
                );
              }}
              keyExtractor={item => item.title}
            />
          </SafeAreaView>
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              style={{
                marginRight: 5,
                marginLeft: 2.5,
                paddingTop: 5,
              }}
              data={column2Data}
              scrollEnabled={false}
              // initialNumToRender={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <PostCard
                    hideCategory={this.props.hideCategory ?? false}
                    categoryName={item.postCategory.description}
                    categoryColor={item.postCategory.rgba_colors}
                    userdp={item.users.profile_pic_url}
                    postId={item.id}
                    comments={item.comments}
                    description={item.description}
                    first_name={item.users.first_name}
                    last_name={item.users.last_name}
                    userId={item.users.id}
                    userWiseLike={item.userWiseLike}
                    userSavedPost={item.userSavedPost}
                    isFollowing={item.isFollowing}
                    title={item.title}
                    views={item.view_count}
                    likes={item.likes_count}
                    createdAt={item.created_at}
                    height={
                      item.postDetail.length > 0 &&
                      item.postDetail[0].height != undefined
                        ? item.postDetail[0].height
                        : 200
                    }
                    width={
                      item.postDetail.length > 0 &&
                      item.postDetail[0].width != undefined
                        ? item.postDetail[0].width
                        : 200
                    }
                    imageurl={
                      item.postDetail.length > 0
                        ? item.postDetail[0].image_url
                        : 'https://travelog-pk.herokuapp.com/images/default.png'
                    }>
                    {' '}
                  </PostCard>
                );
              }}
              keyExtractor={item => item.title}
            />
          </SafeAreaView>
        </View>

        {this.props.loadstate && (
          <View
            style={{
              backgroundColor: '#f9fdfe',
              padding: '2%',
            }}>
            <MaterialIndicator size={20} />
          </View>
        )}
      </View>
    );
  }
}

export default withNavigation(RenderCards);
