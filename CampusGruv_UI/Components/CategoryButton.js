import React, {Component} from 'react';
import {Text, View,Dimensions} from 'react-native';
import {Button} from 'react-native-elements';


export default class CategoryButton extends Component {
  render() {
    return (
      <View style={{width:"30%", marginLeft:"2.5%", marginBottom:"3%"}}>
        <Button
          onPress={() => {
            this.props.onSelect(this.props.cat_id);
          }}
          title={this.props.title}
          titleStyle={{fontSize: 13, ...this.props.titlefontsize}}
          buttonStyle={{
            width:"100%",
            height: 34,
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
