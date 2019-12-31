import React, {Component} from 'react';
import {Text, View,Image} from 'react-native';

export default class MultipleAccountsPic extends Component {
  render() {
    return (
      <View style={{flexDirection:"row"}}>
        <Image
          source={this.props.img}
          style={{width: 40, height: 40, borderRadius: 50 , margin:"2%"}}></Image>
          {this.props.name ? <Text style={{margin:"2%", color:"grey",fontWeight:"bold",fontSize:20,alignSelf:"center", marginLeft:0}}>{this.props.name}</Text> : null}
      </View>
    );
  }
}
