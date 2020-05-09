import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default class Category extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 4,
          shadowColor: 'rgba(0,0,0,0.5)',
          elevation: 4,
          borderRadius: 7,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.onSelect1(this.props.cat_id);
            // this.props.onSelect2(this.props.cat_id, this.props.description);
          }}>
          <View
            style={{
              borderRadius: 7,
              backgroundColor: 'rgba(0,0,0,.6)',
            }}>
            <Image
              source={{uri: this.props.image}}
              style={{
                borderBottomLeftRadius: 7,
                borderBottomRightRadius: 7,
                borderTopRightRadius: 7,
                borderTopLeftRadius: 7,
                width: 160,
                height: 135,
                opacity: 0.4,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                top: 5,
                position: 'absolute',
              }}>
              {this.props.description}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
