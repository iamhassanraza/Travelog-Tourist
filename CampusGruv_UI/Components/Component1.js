import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'

export default class Category extends Component {
    render() {
        return (
            <View style={{flex:1,height:110}}>
     <TouchableOpacity>
            <ImageBackground source={require('../Assets/Images/book.jpg')} style={{width:155,height:120}}>
     <View style={{width:'104%',height:'104%',borderRadius:6,backgroundColor:this.props.color}}>
     <Text style={{alignSelf:'center',color:'#fff',fontSize:15,fontWeight:"bold"}}>{this.props.title}</Text>

     </View>
            </ImageBackground>
     </TouchableOpacity>
 </View>
 
 
        )
    }
}
