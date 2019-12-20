import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, Platform,TextInput,Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class ButtonSignInUp extends React.Component {
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

        <View    style={styles.butt}>
      <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'white'}}>{this.props.butt}</Text>
        </View>


        
            </View>
        );
      }
    }

    const styles= StyleSheet.create({


    butt:{height:40,width:'50%',marginLeft:'25%',borderRadius:10,marginTop:40,justifyContent:'center',backgroundColor:'transparent',borderColor:'white',borderWidth:0.6}

    });
    export default ButtonSignInUp;
