import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class NoPost extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#E5E5E5',
          alignItems: 'center'
        }}>
        <Image style={{height:'35%', width:"35%"}} source={require('../Assets/Images/NO.png')}/>
        <Text
          style={{
            color: '#b5b3b3',
            fontSize: 25,
            fontWeight: 'bold',
            marginTop:"-10%"
          }}>
          No Post Availiable
        </Text>
      </View>
    );
  }
}
