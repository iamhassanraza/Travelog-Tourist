import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Avatar,Divider } from 'react-native-elements';


export default class NoticationComponent extends Component {
    render() {
        return (
            <View>
<View style={{marginTop:5,flexDirection:"row",padding:5}}>
<Avatar
  size="small"
  rounded
 source={{uri:this.props.uri}}
/>
        <Text style={{color:'grey',marginTop:5,marginLeft:5,fontWeight:'bold'}}>{this.props.title}</Text>
        <Text style={{marginTop:5,marginLeft:5}}>{this.props.activity}</Text>
        <Text style={{marginTop:10,marginLeft:5,fontSize:8,color:'grey'}}> {this.props.time}</Text>
  </View>          
  <Divider></Divider>
            </View>
        )
    }
}

