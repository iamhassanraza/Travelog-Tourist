import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, Button } from 'react-native'
export default class Category extends Component {
    
    state = {
           
    }
   
    render() {
        return (
            <View style={{flex:1,height:100}}>
     <TouchableOpacity>
            <ImageBackground source={{uri:this.props.uri}} style={{width:160,height:120,borderRadius:5,opacity:0.6}}>
     <View style={{width:'100%',height:'100%',backgroundColor:this.props.color,}}>
      <View>
     <Text style={{alignSelf:'center'}}>{this.props.title}</Text>
    </View>
     </View>
            </ImageBackground>
     </TouchableOpacity>
    
    </View>
 
 
        )
    }
}