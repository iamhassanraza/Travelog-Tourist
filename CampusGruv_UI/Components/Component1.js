import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'

export default class Category extends Component {
    
    constructor()
    {
        super();
        this.state=
        {
            CategoryTitle:'',

        }
    }
    render() {
        console.log(this.state.CategoryTitle)

        return (
            <View style={{flex:1,height:110,opacity:0.7}}>
     <TouchableOpacity onPress={()=>{this.setState({CategoryTitle:this.props.title})}}>
            <ImageBackground source={require('../Assets/Images/book.jpg')} style={{width:160,height:120,borderRadius:5}}>
     <View style={{width:'100%',height:'100%',backgroundColor:this.props.color}}>
     <Text style={{alignSelf:'center',color:'#fff',fontSize:15,fontWeight:"bold"}}>{this.props.title}</Text>

     </View>
            </ImageBackground>
     </TouchableOpacity>
 </View>
 
 
        )
    }
}
