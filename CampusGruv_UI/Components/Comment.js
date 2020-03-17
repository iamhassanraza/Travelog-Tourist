import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import TextEncoding from 'text-encoding'

// Props dp,name,comment

export default class Comment extends Component {
  render() {
    TextDecoder = TextEncoding.TextDecoder
    return (
      <View style={{paddingRight: '7%', marginTop: '1%'}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#e6e4e1',
            flexDirection: 'row',
            paddingTop: '2%',
            paddingLeft: '3%',
            borderRadius: 9,
            paddingBottom: '2%',
          }}>
          <Image
            source={{uri: this.props.dp}}
            style={{width: 30, height: 30, borderRadius: 50}}></Image>

          <View style={{flexDirection: 'column', width: 270, marginLeft: '2%'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'grey'}}>
              {this.props.name}
            </Text>
            <Text style={{fontSize: 11, marginTop: '-1%', color: 'grey'}}>
              {this.props.comment}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
