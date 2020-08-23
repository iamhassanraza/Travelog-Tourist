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

  componentDidMount() {}

  // shouldComponentUpdate = nextProps => {
  //   if (nextProps.posts != this.state.posts) {
  //     this.setState({posts: nextProps.posts});
  //     return true;
  //   }
  //   return false;
  // };

  componentDidUpdate = (nextProps, prevState) => {};

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
    return (
      <>
        <View
          style={{
            height: '100%',
            flexDirection: 'row',
            backgroundColor: '#f9fdfe',
            flex: 1,
          }}>
          <SafeAreaView style={{flex: 1}}>
            {/* <MasonryList
              rerender={true}
              // refreshing={this.state.refreshing}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin={() => {
                this.setState({onEndReachedCalledDuringMomentum: false});
              }}
              listContainerStyle={{
                paddingTop: 5,
                alignSelf: 'center',
                marginLeft: 5,
                backgroundColor: '#f9fdfe',
              }}
              containerWidth={Dimensions.get('window').width - 5}
              imageContainerStyle={{
                // borderBottomLeftRadius: 7,
                // borderBottomRightRadius: 7,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}
              onPressImage={item =>
                this.props.navigation.navigate('PostDetail', {
                  PostData: {
                    uri: item.postDetail[0].image_url,
                    title: item.title,
                    postId: item.id,
                    likeStatus: item.userWiseLike[0] ? true : false,
                    saveStatus: item.userSavedPost[0] ? true : false,
                    isFollowing: item.isFollowing,
                    userAvatar: item.users.profile_pic_url,
                    userId: item.users.id,
                    first_name: item.users.first_name,
                    last_name: item.users.last_name,
                    description: item.description,
                    comments: item.comments,
                    views: item.view_count,
                    likes: item.likes_count,
                    // createdAt: new Date(
                    //   this.props.createdAt.replace(' ', 'T'),
                    // ),
                  },
                })
              }
              renderIndividualFooter={item => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('PostDetail', {
                        PostData: {
                          uri: item.postDetail[0].image_url,
                          title: item.title,
                          postId: item.id,
                          likeStatus: item.userWiseLike[0] ? true : false,
                          saveStatus: item.userSavedPost[0] ? true : false,
                          isFollowing: item.isFollowing,
                          userAvatar: item.users.profile_pic_url,
                          userId: item.users.id,
                          first_name: item.users.first_name,
                          last_name: item.users.last_name,
                          description: item.description,
                          comments: item.comments,
                          views: item.view_count,
                          likes: item.likes_count,
                          // createdAt: new Date(
                          //   this.props.createdAt.replace(' ', 'T'),
                          // ),
                        },
                      })
                    }>
                    <View
                      style={{
                        width: item.masonryDimensions.width,
                        backgroundColor: 'white',
                        marginBottom: '2%',
                        borderBottomLeftRadius: 7,
                        borderBottomRightRadius: 7,
                        paddingLeft: '5%',
                      }}>
                      <View
                        style={{
                          //flex: 1,
                          flexDirection: 'row',
                        }}>
                        <View style={{paddingVertical: 5}}>
                          <Text
                            numberOfLines={1}
                            style={{paddingHorizontal: 2, fontWeight: '400'}}>
                            {item.title}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: '1%',
                          paddingBottom: '3%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 2}}>
                          <FastImage
                            source={
                              item.users.profile_pic_url === '' ||
                              !item.users.profile_pic_url
                                ? defaultAvatar
                                : {
                                    uri: item.users.profile_pic_url,
                                  }
                            }
                            style={{
                              width: 30,
                              borderColor: '#616963',
                              borderWidth: 0.3,
                              height: 30,
                              borderRadius: 50,
                            }}
                          />
                        </View>
                        <View style={{flex: 6, alignSelf: 'center'}}>
                          <Text style={{color: 'grey', marginLeft: 2}}>
                            {item.users.first_name +
                              ' ' +
                              (item.users.last_name === '' ||
                              !item.users.last_name
                                ? ''
                                : item.users.last_name.charAt(0) + '.')}
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            marginRight: '4%',
                          }}>
                          <ViewsIcon color="grey" name="eye" />
                          <Text
                            style={{
                              fontSize: 7,
                              color: 'grey',
                              marginTop: -2,
                              alignSelf: 'center',
                            }}>
                            {item.view_count}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
              // spacing={3}
              images={mappedPosts}
            /> */}
            <FlatList
              ref={'flatlist'}
              style={{
                flex: 1,
                paddingTop: 5,
              }}
              onContentSizeChange={() => {
                if (this.props?.newPost) {
                  this.refs.flatlist.scrollToOffset({
                    offset: 0,
                    animated: true,
                  });
                  this.props?.toggleNewPost();
                }
              }}
              onRefresh={this.props.onRefresh}
              refreshing={this.props.refreshState}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => {
                this.setState({onEndReachedCalledDuringMomentum: false});
              }}
              initialNumToRender={4}
              // removeClippedSubviews={true}
              data={this.props.posts}
              numColumns={2}
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
          {/* <SafeAreaView style={{flex: 1}}>
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
            </SafeAreaView> */}
        </View>

        <View
          style={{
            backgroundColor: '#f9fdfe',
            padding: '2%',
          }}>
          {this.props.loadstate && <MaterialIndicator size={20} />}
        </View>
      </>
    );
  }
}

export default withNavigation(RenderCards);
