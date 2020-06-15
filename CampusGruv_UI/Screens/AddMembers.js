import React, { Component } from 'react'
import { Text, View, TouchableOpacity,  TextInput } from 'react-native'
import {ThemeBlue} from '../Assets/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AddMembers extends Component {




state={
    search:''
}






    SearchItems = text => {
        if (text) {
        //   this.fetchUsers(text);
        console.log('fetch karo');
        } else {
          console.log('teeno nahi chalay');
        }
      };







    render() {
        return (
          








<View style={{backgroundColor: '#0C91CF'}}>
        <View
          style={{
            backgroundColor: ThemeBlue,
          }}>
          <View
            style={{
              backgroundColor: ThemeBlue,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                width: '65%',
                backgroundColor: 'white',
                marginLeft: 10,
                borderRadius: 8,
              }}>
              <Icon
                name="search"
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  paddingLeft: '3%',
                  color: 'grey',
                }}
              />
              <TextInput
                placeholder="Search"
                style={{height: '90%', width: '100%', paddingVertical: 0}}
                value={this.state.search}
                onChangeText={text => {
                  this.setState({search: text});
                  this.SearchItems(text);
                }}
              />
            </View>
           


             
          </View>

         
</View>
</View>

        )
    }
}
