import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';

export default class CategoryButton extends Component {
    render() {
        return (
            // <View style={{width:"28%",marginTop:35,height:10}}>
            //    <Button title={"hey"} color="green" ></Button>
            // </View>

            <View style={{marginTop:15}}>
                <Button
                onPress={()=>{this.props.onSelect(this.props.title)}}
                 title={this.props.title}
                 titleStyle={{fontSize:13, ...this.props.titlefontsize}} 
                 
                 buttonStyle={{width:100, height:32, backgroundColor:this.props.bgclr ,...this.props.style}} />
                 <View style={{ 
                    borderTopColor: "#dfede3",
                    borderBottomColor: "#dfede3",
                    elevation: this.props.Elevation ? this.props.Elevation : 3, borderWidth:0.2  }}></View>
            </View>
        )
    }
}

