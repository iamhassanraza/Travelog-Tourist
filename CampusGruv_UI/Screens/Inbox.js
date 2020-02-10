import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import {SearchBar} from 'react-native-elements'
import InboxComponent from '../Components/InboxComponent'
export default class Inbox extends Component {
    constructor()
    {
        super();
        this.state={
            Text:'',
        }
    }
    updateSearch = (e) => {
        this.setState({Text:e})
    }


    render() {
        return (
            <View style={{flex:1}}> 
<ScrollView>
<SearchBar platform='ios'
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
          value={this.state.Text}
      />
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' title="Saifullah" subtitle="how are you bro" time="5 min" read={true}/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Faraz" subtitle="how are you bro" time="10 min"/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' title="Hassan" subtitle="how" time="15 min"/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Ali" subtitle="how are you bro" time="20 min"/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' title="Umair" subtitle="how are you bro" time="25 min"/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Asim" subtitle="how are you bro" time="30 min"/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' title="Jawad" subtitle="how are you bro" time="35 min"/>
<InboxComponent   uri='https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' title="Ammar" subtitle="how are you bro" time="40 min"/>

</ScrollView>
                 </View>
        )
    }
}
