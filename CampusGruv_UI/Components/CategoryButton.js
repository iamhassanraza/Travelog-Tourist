import React, {Component} from 'react';
import {Text, View,Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const mywidth = Dimensions.get('window').width/22
const myheight = Dimensions.get('screen').height/28

export default class CategoryButton extends Component {
  render() {
    return (
      <View style={{marginLeft:mywidth,marginBottom:myheight}}>
        <Button
          onPress={() => {
            this.props.onSelect(this.props.cat_id);
          }}
          title={this.props.title}
          titleStyle={{fontSize: 13, ...this.props.titlefontsize}}
          buttonStyle={{
            width: 110,
            height: 32,
            backgroundColor: this.props.bgclr,
            ...this.props.style,
          }}
        />
        <View
          style={{
            borderTopColor: '#dfede3',
            borderBottomColor: '#dfede3',
            elevation: this.props.Elevation ? this.props.Elevation : 3,
            borderWidth: 0.2,
          }}>
          </View>
      </View>
    );
  }
}
