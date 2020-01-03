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
          titleStyle={{fontSize: this.props.fsize, fontWeight:this.props.bold}}
          buttonStyle={{
            width:"100%",
            height: 34,
            backgroundColor: this.props.bgclr,
            borderBottomWidth:this.props.borderbottom,
            borderBottomColor:"rgba(5,5,5,0.5)",
            ...this.props.style,
          }}
        />
        <View
          style={{
            borderTopColor: this.props.bgclr,
            borderBottomColor: this.props.bgclr,
            borderBottomLeftRadius:5,
            elevation: this.props.Elevation ? this.props.Elevation : 2,
            borderWidth: 0.2,
          }}>
          </View>
      </View>
    );
  }
}
