import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class AvatarCampusStatus extends Component {
  state = {
    current: this.props.status,
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: '2%',
          paddingTop: '2%',
          paddingLeft: '2%',
          paddingRight: '2%',
        }}>
        <View style={{flexDirection: 'row', flex: 4, alignItems: 'center'}}>
          <Image
            source={this.props.pic}
            style={{height: 40, width: 40, borderRadius: 50}}></Image>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'grey', paddingLeft:"2%"}}>
          {this.props.name}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({current: !this.state.current});
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              flexDirection: 'row',
              height: 27,
              width: 62,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              borderColor: this.state.current ? ThemeBlue : 'grey',
            }}>
            <Text
              style={{
                color: this.state.current ? ThemeBlue : 'grey',
                fontSize: 12,
              }}>
              {this.state.current ? 'Current' : 'View'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
