import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class NoPost extends Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          // backgroundColor: '#E5E5E5',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 130, width: 130}}
          source={require('../Assets/Images/NO.png')}
        />
        <Text
          style={{
            color: '#b5b3b3',
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: -20,
          }}>
          {this.props.name ? this.props.name : 'No Post Available'}
        </Text>
      </View>
    );
  }
}
