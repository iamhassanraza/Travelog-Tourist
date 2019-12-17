import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import { SearchBar,Avatar, Divider } from 'react-native-elements';


export default class InboxComponent extends Component {

    render() {
        return (
            <View>
           <TouchableOpacity>

<View style={{padding:8,flexDirection:'row',justifyContent:'space-between'}}>
<Avatar
  size="small"
  rounded
  source={{uri:this.props.uri}}
  size={40}
/>
<View style={{flexDirection:'column',alignSelf:'center',marginLeft:10,flex:2}}>
        <Text style={{fontWeight:'bold',color:'#7A7E7F'}}>{this.props.title}</Text>
        <Text style={{color:this.props.read?'black':'grey',fontWeight:'bold'}}>{this.props.subtitle}</Text>
            </View>
<View style={{marginBottom:10,alignSelf:'center'}}>
<Text style={{color:'grey',fontSize:8}}>{this.props.time}</Text>
</View>
  </View>
  </TouchableOpacity>

  </View>
        )
    }
}
