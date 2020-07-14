import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import PostCard from './PostCard';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UIActivityIndicator} from 'react-native-indicators';

class RenderCards extends PureComponent {
  state = {
    onEndReachedCalledDuringMomentum: true,
  };

  loadMore = ({distanceFromEnd}) => {
    if (
      !this.state.onEndReachedCalledDuringMomentum ||
      this.props.posts.length < this.props.totalPosts
    ) {
      this.setState({onEndReachedCalledDuringMomentum: true}, () => {
        this.props.loadMore();
      });
    }
  };

  render() {
    if (this.props.posts) {
      const column1Data = this.props.posts.filter((item, i) => i % 2 === 0);
      const column2Data = this.props.posts.filter((item, i) => i % 2 === 1);
      return (
        <>
          <View
            style={{
              height: '100%',
              flexDirection: 'row',
              backgroundColor: '#f9fdfe',
              // paddingHorizontal: 10,
              flex: 1,
            }}>
            <SafeAreaView style={{flex: 1}}>
              <FlatList
                style={{marginLeft: 5, marginRight: 2.5}}
                data={column1Data}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <PostCard
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
                  // paddingTop: 25,
                }}
                data={column2Data}
                scrollEnabled={false}
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

          {this.props.posts.length < this.props.totalPosts ? (
            <View
              style={{
                backgroundColor: '#f9fdfe',
                padding: '2%',
              }}>
              {this.props.loadstate ? (
                <UIActivityIndicator size={20} />
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#0C91CF',
                    padding: '2%',
                  }}
                  onPress={() => {
                    this.props.loadMore();
                  }}>
                  <Icon
                    name="expand-more"
                    style={{width: 20, height: 20, color: 'black'}}
                  />
                </Text>
              )}
            </View>
          ) : null}
        </>
      );
    } else {
      return (
        <View>
          <Text>No posts to show</Text>
        </View>
      );
    }
  }
}

export default withNavigation(RenderCards);
