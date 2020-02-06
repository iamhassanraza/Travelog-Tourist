import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Avatar,Divider } from 'react-native-elements';


export default class NoticationComponent extends Component {
    render() {
        return (
            <View>
<View style={{width:'100%',flexDirection:'row',padding:5,alignItems:'center'}}>
    <View style={{flexDirection:'row',width:'10%'}}>
<Avatar
  size="small"
  rounded
 source={{uri:this.props.uri}}
/>

</View>

<View style={{width:'86%',flexDirection:'row',flexWrap:'wrap'}}>
    <Text>

        <Text style={{marginLeft:'3%',color:'grey',fontWeight:'bold'}}>{this.props.title} </Text>
        <Text style={{marginLeft:'3%'}}> {this.props.activity} asdsa sadsad</Text>
        <Text style={{fontSize:8,color:'grey',}}> {this.props.time}</Text>
    </Text>
</View>
  </View>          
  <Divider></Divider>
            </View>
        )
    }
}

