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

class InboxComponent extends Component {
  state = {
    room_id: null,
  };

  fetchRoomDetails = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${require('../config').default.production}api/v1/room/details?user_id=${
        this.props.user_id
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    this.setState({
      room_id: JsonResponse[0].room_id,
    });
  };

  async componentDidMount() {
    await this.fetchRoomDetails();
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('chat', {
              room_id: this.state.room_id,
              user_id: this.props.user_id,
              avatar: this.props.uri,
              name: this.props.title,
              msg: this.props.subtitle,
            });
          }}>
          <View
            style={{
              padding: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Avatar
              size="small"
              rounded
              source={
                this.props.uri === '' || !this.props.uri
                  ? defaultAvatar
                  : {
                      uri: this.props.uri,
                    }
              }
              size={40}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginLeft: 10,
                flex: 2,
              }}>
              <Text style={{fontWeight: 'bold', color: '#181a1a'}}>
                {this.props.title}
              </Text>
              <Text style={{color: 'grey'}}>{this.props.subtitle}</Text>
            </View>
            <View style={{marginBottom: 10, alignSelf: 'center'}}>
              <Text style={{color: 'grey', fontSize: 8}}>
                {this.props.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(InboxComponent);
