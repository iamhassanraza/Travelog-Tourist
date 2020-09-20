import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeColor } from "../assets/Colors/Colors"


const FlatListContainer = (props) => {
    return (
        <View style={props.style}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:8,marginTop:15}}>
        <Text style={{fontSize:18, fontWeight:'bold', marginLeft: '2%'}}>{props.title}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontWeight:'bold',color:ThemeColor}}>View all </Text> 
        <Text style={{marginRight:5}}><Icon name="dots-vertical" style={{fontSize:25,color:'grey'}}></Icon></Text>
        </View>
        </View>
        {props.children}
        </View>
    )
}

export default FlatListContainer
