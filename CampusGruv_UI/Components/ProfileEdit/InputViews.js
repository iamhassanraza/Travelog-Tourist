import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, Platform,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputView extends React.Component {
  static navigationOptions = {
    header: null
  }
    constructor(props) {
      super(props);
      this.state = {
        resta: []
      };
    }
    render() {
      // const { navigate } = this.props.navigation;
      return (
          <View>
        

        {/* OPTIONS */}

        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
      <Text style={{fontSize:20,marginTop:15,marginLeft:10,width:'25%'}}>{this.props.name}</Text>
<TextInput
        style={{width:'60%',borderBottomColor:'#C4C4C4',borderBottomWidth:0.5,fontSize:20,color:'#ACACAC'}}
        placeholder={this.props.ph}
                      />
        <Icon name="pencil" color='#C4C4C4' size={26} style={{width:'10%',marginTop:15}}/>
        </View>


        
            </View>
        );
      }
    }

    export default InputView;