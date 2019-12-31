import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

export default class CategoryButton extends Component {
  render() {
    return (
      <View style={{marginTop: "5%", marginLeft:"2%"}}>
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
