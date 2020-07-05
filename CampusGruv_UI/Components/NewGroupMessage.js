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
import {ThemeBlue} from '../Assets/Colors';

class NewGroupMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: null,
      selected: false,
      id: this.props.id,
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

  onPressItem = () => {
    if (this.state.selected) {
      this.setState({selected: false}, () => {
        this.props.removeSelected({
          id: this.props.id,
          name: this.props.first_name + ' ' + this.props.last_name,
          dp: this.props.profile_pic_url,
        });
      });
    } else {
      this.setState({selected: true}, () => {
        this.props.addSelected({
          id: this.props.id,
          name: this.props.first_name + ' ' + this.props.last_name,
          dp: this.props.profile_pic_url,
        });
      });
    }
  };

  componentDidMount() {
    // this.fetchRoomDetails();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      selected: nextProps.selected.find(obj => {
        if (prevState.id === obj.id) return true;
        else return false;
      }),
    };
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '1%',
        }}>
        <View style={{flex: 4}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '1%',
            }}>
            <FastImage
              source={
                this.props.profile_pic_url === '' || !this.props.profile_pic_url
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
            <TouchableOpacity
              onPress={() => {
                this.onPressItem();
              }}
              style={{position: 'absolute', right: 15}}>
              <View
                style={{
                  backgroundColor: this.state.selected ? ThemeBlue : 'white',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'grey',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default NewGroupMessage;

{
  /* <View
              style={{
                position: 'absolute',
                right: 15,
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'grey',
              }}></View> */
}
