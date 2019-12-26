import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Avatar,Divider } from 'react-native-elements';


export default class NoticationComponent extends Component {
    render() {
        return (
            <View>
<View style={{justifyContent:'space-between',flexDirection:'row',padding:5,alignItems:'center'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
<Avatar
  size="small"
  rounded
 source={{uri:this.props.uri}}
/>
        <Text style={{marginLeft:'3%',color:'grey',fontWeight:'bold'}}>{this.props.title}</Text>
        <Text style={{marginLeft:'3%'}}>{this.props.activity}</Text>

</View>

<View style={{justifyContent:'flex-end'}}>
        <Text style={{fontSize:8,color:'grey',}}> {this.props.time}</Text>
</View>
  </View>          
  <Divider></Divider>
            </View>
        )
    }
}

