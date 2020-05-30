import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {bkgdColor, primaryColor, greyColor} from '../Assets/Colors';
import TimeAgo from 'react-native-timeago';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import FastImage from 'react-native-fast-image';

class NoticationComponent extends Component {
  render() {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: this.props.unread ? '#E5E5E5' : '#f9fdfe',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (this.props.activity.includes('post')) {
              this.props.navigation.navigate('PostDetail', {
                PostData: {
                  uri: this.props.imageurl,
                  title: this.props.title,
                  postId: this.props.postId,
                  likeStatus: this.props.userWiseLike[0] ? true : false,
                  saveStatus: this.props.userSavedPost[0] ? true : false,
                  isFollowing: this.props.isFollowing,
                  userAvatar: this.props.User.profile_pic_url,
                  userId: this.props.userId,
                  first_name: this.props.User.first_name,
                  last_name: this.props.User.last_name,
                  description: this.props.description,
                  comments: this.props.comments,
                  views: this.props.views,
                },
              });
            } else if (this.props.activity.includes('follow')) {
              this.props.navigation.navigate('UserProfile', {
                userNavId: this.props.userId,
                userNavDp: this.props.userdp,
                userNavFirstName: this.props.first_name,
                userNavLastName: this.props.last_name,
                userCampus: this.props.userCampus,
                userFollowing: this.props.isFollowing,
              });
            }
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', width: '12%'}}>
            <FastImage
              source={
                this.props.uri === '' || !this.props.uri
                  ? defaultAvatar
                  : {
                      uri: this.props.uri,
                    }
              }
              style={{height: 40, width: 40, borderRadius: 50}}
            />
          </View>

          <View style={{width: '75%', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginLeft: 2}}>
              {this.props.activity}{' '}
            </Text>
          </View>
          <View style={{width: '13%'}}>
            <TimeAgo time={this.props.time} style={{fontSize: 8}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(
  connect(
    mapStateToProps,
    null,
  )(NoticationComponent),
);
