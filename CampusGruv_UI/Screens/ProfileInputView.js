import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, Platform,TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputView extends React.Component {
  static navigationOptions = {
    header: null
  }
    constructor(props) {
      super(props);
      this.state = {
        resta: [],
        text:''
      };
    }


    // this.props.getdatas(this.state.text);
    render() {
      // const { navigate } = this.props.navigation;
      return (
          <View>
        

        {/* OPTIONS */}

        <View style={{width:'90%',marginLeft:'5%',marginTop:this.props.mt,borderColor:'#C4C4C4',backgroundColor:'white',borderWidth:0.5,borderRadius:10}}>
<TextInput
        style={{width:'90%',fontSize:20,color:'#ACACAC'}}
        placeholder={this.props.ph}
    
                      />
        </View>


        
            </View>
        );
      }
    }

    export default InputView;