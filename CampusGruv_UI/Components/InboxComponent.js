import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {SearchBar, Avatar, Divider} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import TimeAgo from 'react-native-timeago';
import FastImage from 'react-native-fast-image';
import ParsedText from 'react-native-parsed-text';

class InboxComponent extends Component {
  state = {
    room_id: null,
  };

  // fetchRoomDetails = async () => {
  //   const Token = await AsyncStorage.getItem('TOKEN');
  //   const Response = await fetch(
  //     `${require('../config').default.production}api/v1/room/details?user_id=${
  //       this.props.user_id
  //     }`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${Token}`,
  //       },
  //     },
  //   );
  //   const JsonResponse = await Response.json();
  //   this.setState({
  //     room_id: JsonResponse[0].room_id,
  //   });
  // };

  async componentDidMount() {
    // await this.fetchRoomDetails();
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('chat', {
              room_id: this.props.room_id,
              user_id: this.props.user_id,
              avatar: this.props.uri,
              name: this.props.title,
              msg: this.props.subtitle,
              room_type: this.props.room_type,
            });
          }}>
          <View
            style={{
              padding: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FastImage
              source={
                this.props.uri === '' || !this.props.uri
                  ? defaultAvatar
                  : {
                      uri: this.props.uri,
                    }
              }
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#C4C4C4',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 10,
                flex: 2,
              }}>
              <Text style={{fontWeight: '700', color: '#181a1a'}}>
                {this.props.title}
              </Text>
              <ParsedText numberOfLines={2} style={{color: 'grey'}}>
                {this.props.subtitle.includes('http')
                  ? 'sent a photo'
                  : this.props.subtitle}
              </ParsedText>
            </View>
            <View style={{marginBottom: 10, alignSelf: 'center'}}>
              <Text style={{color: 'grey', fontSize: 10}}>
                <TimeAgo time={this.props.time} style={{fontSize: 8}} />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(InboxComponent);
