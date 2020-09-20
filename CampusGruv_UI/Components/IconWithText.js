// ================ props ===========
// title , subtitle , icon (icon name from material community icon ) 
// to style the whole component: props - > style
// to style just icon: props -> iconstyle
// to style text only: props -> textstyle
// to add suntitle in same line : props -> linear = true
// ======================================================= 
import React from 'react'
import { View, Text ,TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import  { ThemeColor } from '../Assets/Colors';
const IconWithText = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress} >
        <View style={{flexDirection:'row',...props.style}}>
         
            <Icon style={{color: ThemeColor,fontSize: 20,...props.iconstyle}} name={props.icon} />
          
            <View style={{flexDirection:props.linear ? 'row' : 'column'}}>
            <Text style={{fontWeight:'bold',fontSize:18, color:ThemeColor,...props.textstyle}}>{props.title} </Text>
           { props.subtitle ?  <Text style={{fontSize:16, color:'#505152',...props.textstyle}}>{props.subtitle}</Text> : null}
            
            </View>
        </View>
        </TouchableWithoutFeedback>
    )   
}

export default IconWithText
