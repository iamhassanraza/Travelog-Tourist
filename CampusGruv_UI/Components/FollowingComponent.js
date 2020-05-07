import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Divider, SearchBar} from 'react-native-elements';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';

export default class FollowingComponent extends Component {
  state = {
    color: 'grey',
    title: 'follow',
    search: '',
    status: true,
  };

  Set = () => {
    // this.setState({status:,title:'following'})
    this.setState(previousState => {
      return {status: !previousState.status, title: !previousState.title};
    });
  };
  updateSearch = search => {
    this.setState({search});
  };
  render() {
    return (
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar
                rounded
                size="small"
                source={
                  this.props.uri === '' || !this.props.uri
                    ? defaultAvatar
                    : {
                        uri: this.props.uri,
                      }
                }
              />
              <Text
                style={{
                  marginLeft: '5%',
                  color: 'grey',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {this.props.title}
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <TouchableOpacity onPress={this.Set}>
              {this.state.status ? (
                <Text
                  style={{
                    borderRadius: 1,
                    borderWidth: 2,
                    borderColor: 'grey',
                    fontWeight: 'bold',
                    padding: 5,
                    alignSelf: 'center',
                    color: 'grey',
                  }}>
                  Follow
                </Text>
              ) : (
                <Text
                  style={{
                    borderRadius: 1,
                    borderWidth: 2,
                    borderColor: '#0C91CF',
                    fontWeight: 'bold',
                    padding: 5,
                    alignSelf: 'center',
                    color: '#0C91CF',
                  }}>
                  Following
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Divider />
      </View>
    );
  }
}
