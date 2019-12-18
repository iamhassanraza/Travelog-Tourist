import React, { Component } from 'react'
import { Text, View ,TextInput,Button} from 'react-native'
import Stripe from 'react-native-stripe-api';

export default class stripe extends Component {
    constructor()
    {
        super();
        this.state={
            num:"",
            expmonth:"",
            expyear:"",
            cvc:"",
            token:''
        }
        this.add=this.add.bind(this);
    } 

    async add()
    {
        const apiKey = 'sk_test_ZW5v8sV275kLNItA31uXA2zP00wjql7Jx2';
        const client = new Stripe(apiKey);
        const token = await client.createToken('4242424242424242','09',  '18', '111','12345').then((x)=>{

            console.log("tokenobj===========>",x)
        }).catch((e)=>{
            console.error("error=======>",e.message);
            
        })
    }
    render() {
    
        return (
            <View>
                <TextInput placeholder="Number"
                value={this.state.num}
                onChangeText={(text)=>{this.setState({num:text})}}
                ></TextInput>


<TextInput placeholder="Month"
                value={this.state.expmonth}
                onChangeText={(month)=>{this.setState({expmonth:month})}}
                ></TextInput>




<TextInput placeholder="Year" style={{width:200,height:50}}
                value={this.state.expyear}
                onChangeText={(year)=>{this.setState({expyear:year})}}
                ></TextInput>


<TextInput placeholder="cvc"
                value={this.state.cvc}
                onChangeText={(cv)=>{this.setState({cvc:cv})}}
                ></TextInput>


                <Button title="Addcart" onPress={this.add}></Button>
            </View>
        )
    }
}
