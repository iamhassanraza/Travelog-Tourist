import React, { Component } from 'react'
import { Text, View,TextInput,Image } from 'react-native'
import FollowComponent from '../Components/FollowingComponent'
import { SearchBar, Header } from 'react-native-elements';


export default class Follow extends Component {
    state = {
        search: ''
    }


    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        console.log(search)

        return (
            <View>
                <Header containerStyle={{ height: 60 }}
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

<View style={{height:30,borderWidth: 1,borderRadius:20,width:'90%',borderColor:'grey',alignSelf:'center',marginTop:5,flexDirection:'row'}}>
    <Image source={require('../Assets/Images/search.png')} style={{width:20,height:20,marginLeft:5,marginTop:5}}/>
    <TextInput style={{marginLeft:'3%',padding:0}} placeholder="Search" onChangeText={this.updateSearch}/>

</View>
                
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />
                <FollowComponent title="Abdullah" uri="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" />

            </View>
        )
    }
}
