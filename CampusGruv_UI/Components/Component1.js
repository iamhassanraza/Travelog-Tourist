import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, Button } from 'react-native'

export default class Category extends Component {
    
    state = {
           email:'saifullah.razzaq@yahoo.com',
           item: [],
           Amount:'2000',
    }
    itemFunc =() =>
    {
        console.log('item running')
        this.setState((prevState) => {
            this.state.item = prevState.item.push(this.props.amount)
            console.log(this.state.item)
        })   
    }
    render() {
console.log('rendeering');

        return (
            <View style={{flex:1,height:100}}>
     <TouchableOpacity onPress={this.itemFunc}>
            <ImageBackground source={{uri:this.props.uri}} style={{width:160,height:120,borderRadius:5}}>
     <View style={{backgroundColor:this.props.color,flexDirection:'row',justifyContent:'space-between'}}>
     <Text style={{alignSelf:'flex-start',color:'white',fontSize:17,fontWeight:"bold"}}>{this.props.title}</Text>
    <View>
     <Text style={{alignSelf:'flex-end',color:'white',fontSize:15,fontWeight:"bold"}}>{this.props.amount}</Text>
    </View>

     </View>
            </ImageBackground>
     </TouchableOpacity>
    


    </View>
 
 
        )
    }
}
