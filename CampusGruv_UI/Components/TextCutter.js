import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeBlue as ThemeColor } from '../Assets/Colors'

export default class TextCutter extends Component {
    
        state={
            showCompleteText:false
        }

            _showText = (completeText)=>{
            if(this.state.showCompleteText === true)
            {
                return completeText
            }
            else
            {
                return `${completeText.slice(0,this.props.limit)}`
            }
        }
    
    render() {
        return (
                    <Text style={this.props.style} onPress={()=> {
                        this.setState(function(prevState){
                            return {showCompleteText: !prevState.showCompleteText}
                        });}}
                        >

                    
                        {this._showText(this.props.text)}{this.state.showCompleteText ? null :<Text style={{borderWidth:1,borderColor:ThemeColor,fontWeight:'bold',color:ThemeColor}}>...</Text>}
                  

                     </Text>
         
        )
    }
}
