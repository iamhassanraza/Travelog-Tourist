import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

// import {withNavigation} from 'react-navigation';

class NewMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: null,
    };
  }

  fetchRoomDetails = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${require('../config').default.production}api/v1/room/details`,
      {
        method: 'POST',
        body: JSON.stringify({
          room_type: 0,
          userArray: [this.props.id],
          name: this.props.first_name + ' ' + this.props.last_name,
          profile_pic_url: this.props.profile_pic_url,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log(JsonResponse, 'roooooooooooom');
    this.setState({
      room_id: JsonResponse[0].room_id,
    });
  };

  componentDidMount() {
    this.fetchRoomDetails();
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '1%',
        }}>
        <View style={{flex: 4}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigationProps.navigate('chat', {
                room_id: this.state.room_id,
                user_id: this.props.id,
                avatar: this.props.profile_pic_url,
                name: this.props.first_name + ' ' + this.props.last_name,
                room_type: 'personal',
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '1%',
              }}>
              <FastImage
                source={
                  this.props.profile_pic_url === '' ||
                  !this.props.profile_pic_url
                    ? defaultAvatar
                    : {
                        uri: this.props.profile_pic_url,
                      }
                }
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'grey',
                  paddingLeft: '2%',
                }}>
                {this.props.first_name + ' ' + this.props.last_name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default NewMessageComponent;
