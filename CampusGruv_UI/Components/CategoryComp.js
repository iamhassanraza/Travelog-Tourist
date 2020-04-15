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
          marginTop: 10,
         
        }}>
     
          <TouchableWithoutFeedback 
          onPress={()=> {
              this.props.onSelect1(this.props.cat_id);
              // this.props.onSelect2(this.props.cat_id, this.props.description);
          }}
          >
          <View style={{backgroundColor: `rgba(${this.props.color},0.6)`, borderRadius:8}}>
            <Image
              source={{uri: this.props.image}}
              style={{
                width: 160,
                height: 105,
                borderRadius: 5,
                opacity: 0.4,
                borderRadius:12
              }}></Image>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
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

