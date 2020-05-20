import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import TextEncoding from 'text-encoding';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import FastImage from 'react-native-fast-image';

// Props dp,name,comment

export default class Comment extends Component {
  render() {
    TextDecoder = TextEncoding.TextDecoder;
    return (
      <View style={{paddingRight: '7%', marginVertical: '1%'}}>
        <View
          style={{
            width: '100%',
            // backgroundColor: '#e1e1e1',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <FastImage
            source={
              this.props.dp === '' || !this.props.dp
                ? defaultAvatar
                : {
                    uri: this.props.dp,
                  }
            }
            style={{width: 30, height: 30, borderRadius: 50}}
          />

          <View
            style={{
              flexDirection: 'column',
              borderRadius: 10,
              backgroundColor: '#e1e1e1',
              width: 270,
              marginLeft: '2%',
              paddingLeft: '2%',
              paddingVertical: '1%',
            }}>
            <Text style={{fontSize: 10}}>{this.props.name}</Text>
            <Text style={{fontSize: 14}}>{this.props.comment}</Text>
          </View>
        </View>
      </View>
    );
  }
}
