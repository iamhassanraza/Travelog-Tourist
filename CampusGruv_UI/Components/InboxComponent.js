import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import { SearchBar,Avatar, Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';


class InboxComponent extends Component {

    render() {
      console.log('this.props id',this.props.user_id)
        return (
          <View>
           <TouchableOpacity onPress={()=>{
             this.props.navigation.push('chat',{
               user_id: this.props.user_id,
               avatar: this.props.uri,
               name: this.props.title,
               msg:this.props.subtitle
             })
           }}>

            <View style={{padding:8,flexDirection:'row',justifyContent:'space-between'}}>
              <Avatar
                size="small"
                rounded
                source={{uri:this.props.uri}}
                size={40}
              />
              <View style={{flexDirection:'column',alignSelf:'center',marginLeft:10,flex:2}}>
                <Text style={{fontWeight:'bold',color:'#181a1a'}}>{this.props.title}</Text>
                <Text style={{color:'grey'}}>{this.props.subtitle}</Text>
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

export default withNavigation(InboxComponent)