import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  { ThemeColor } from '../Assets/Colors';

//PROPS : name and text


const IconAndText = props => {

    return (
                <View style={{flexDirection: "row", alignItems: 'center',...props.style}}>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <Icon style={{color: ThemeColor,fontSize: 16, ...props.iconstyle}} name={props.name} />
                    </View> 
                    <View style={{flex: 12}}>
                        <Text style={{fontSize:12, color:'#5c5353',...props.textstyle}}>{props.text}</Text>
                    </View>
                </View>          
    );

};

export default IconAndText;