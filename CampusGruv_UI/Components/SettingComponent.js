import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Avatar,Icon } from "react-native-elements";




export default class Setting extends Component {
    render() {
        return (
            <View style={{padding:10}}>
                
                <View style={{flexDirection:'row',marginLeft:'5%'}}>
                    <Icon type={this.props.type} name={this.props.name} size={30}/>
        <Text style={{alignSelf:'center',fontSize:18,marginLeft:'2%'}}>{this.props.title}</Text>
                </View>

            </View>
        )
    }
}
