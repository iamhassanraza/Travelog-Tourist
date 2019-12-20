import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, Platform,TextInput } from 'react-native';
import InputView from '../Components/ProfileEdit/InputViews'
class ProfilePage extends React.Component {
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
              {/* EDIT PROFILE IMAGE */}
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
            <Image source={{uri:'https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5378.jpg'}} style={{width:150,height:150,borderColor:'#0C91CF',borderWidth:0.9,borderRadius:80}} />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
          <Text style={{color:'#0C91CF',fontWeight:'bold',fontSize:20}}>Change Profile Picture</Text>
            </View>
        

        {/* OPTIONS */}

        <View style={{borderBottomColor:'#C4C4C4',borderBottomWidth:1,marginTop:20}}/>
        <InputView name='Name' ph='Jessica Z'/>
        <InputView name='Campus' ph='University of Pittsburgh'/>
        <InputView name='Major' ph='Major'/>
        <InputView name='Birth Date' ph='MM/DD/YY'/>
        <InputView name='Phone' ph='XXX-XXXXX-XXXX'/>
        <InputView name='Grad Year' ph='2019'/>

            </View>
        );
      }
    }

    export default ProfilePage;