import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

export default class CategoryButton extends Component {
  render() {
    return (
      <View
        style={{
          width: '27%',
          height: 25,
          alignSelf: 'center',
          elevation: 5,
          shadowColor: !this.props.shadow
            ? 'rgba(0,0,0,0.25)'
            : 'rgba(0,0,0,0.5)',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 8,
          margin: '3%',
        }}>
        <Button
          onPress={() => {
            this.props.onSelect(this.props.cat_id);
          }}
          title={this.props.title}
          titleStyle={{
            fontSize: 12.5,
            fontWeight: 'bold',
          }}
          buttonStyle={{
            borderRadius: 4,
            padding: 0,
            height: 25,
            backgroundColor: this.props.bgclr,
            borderBottomColor: 'rgba(5,5,5,0.5)',
            ...this.props.style,
          }}
        />
        <View
          style={{
            borderTopColor: this.props.bgclr,
            borderBottomColor: this.props.bgclr,
          }}
        />
      </View>
    );
  }
}
