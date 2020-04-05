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
import ContentLoader, {Rect} from 'react-content-loader/native';
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
      `${require('../config').default.production}api/v1/room/details?user_id=${
        this.props.id
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
              })
            }>
            <View style={{flexDirection: 'row', padding: '1%'}}>
              <Image
                source={{uri: this.props.profile_pic_url}}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                }}></Image>
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
