import React from 'react'
import { View, Text ,TouchableWithoutFeedback,Image} from 'react-native'
import { Rating } from 'react-native-ratings';
import { VerifiedIcon } from "../assets/icons/Icons";

const OperatorIcon = (props) => {
    return (
        <TouchableWithoutFeedback onPress={()=>alert('navigate to tour operator profile')}>
        <View style={[{flexDirection:'row',alignItems:'center'},props.style]}>
        
        {props.avatar ? (<View>
        <Image source={{uri:`https://travelog-pk.herokuapp.com/images/${props.avatar}`}} style={{height:50,width:50,borderRadius:50}}></Image> 
        </View> ): null}
        
                                <View style={{flex:4, marginLeft:'1%'}}>
                                <Text style={{fontWeight:'bold',fontSize:16} }>{props.name} {props.verified ?<VerifiedIcon size={17}></VerifiedIcon> : false }</Text> 
                                <View style={{flexDirection:'row',alignItems:'center'}}>

                              
                                <Text style={{color:'#ffa534',fontWeight:'bold'}}>{props.rating}</Text>
                                <Rating
                                    readonly={true}
                                    ratingColor='red'
                                    ratingBackgroundColor='red'
                                    ratingCount={5}
                                    startingValue={props.rating? props.rating : 0}
                                    imageSize={15}
                                   style={{alignItems:'flex-start'}}
                                /> 
                                  </View>
                             
                                </View>
                                


        </View>
        </TouchableWithoutFeedback>
    )
}

export default OperatorIcon

