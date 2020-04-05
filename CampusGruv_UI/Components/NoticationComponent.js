import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {bkgdColor, primaryColor, greyColor} from '../Assets/Colors';
import TimeAgo from 'react-native-timeago';
import {withNavigation} from 'react-navigation';

class NoticationComponent extends Component {
  render() {
    return (
      <View style={{backgroundColor: this.props.unread ? '#E5E5E5' : 'white'}}>
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
                  userAvatar: this.props.userdp,
                  userId: this.props.userId,
                  first_name: this.props.first_name,
                  last_name: this.props.last_name,
                  description: this.props.description,
                  comments: this.props.comments,
                  views: this.props.views,
                },
              });
            } else if (this.props.activity.includes('follow')) {
              this.props.navigation.push('UserProfile', {
                userNavId: this.props.userId,
                userNavDp: this.props.userdp,
                userNavFirstName: this.props.first_name,
                userNavLastName: this.props.last_name,
                userCampus: this.props.campus,
                userFollowing: this.state.followed,
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
            <Avatar size="small" rounded source={{uri: this.props.uri}} />
          </View>

          <View style={{width: '75%', flexDirection: 'row'}}>
            <Text style={{fontSize: 16}}>{this.props.activity} </Text>
          </View>
          <View style={{width: '13%'}}>
            <TimeAgo time={this.props.time} style={{fontSize: 8}} />
          </View>
        </TouchableOpacity>
        <Divider
          style={
            {
              //marginTop: '2.5%'
            }
          }></Divider>
      </View>
    );
  }
}

export default withNavigation(NoticationComponent);
