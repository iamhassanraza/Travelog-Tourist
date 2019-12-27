import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ThemeBlue} from '../Assets/Colors'
import PostList from '../Components/PostsList'

export default class Searching extends React.PureComponent {
  state = {
    selection: '',
  };

  renderFeed = () => {
    return(
           
        <View>
            <Text>hy feed</Text>
        
        </View>
           
    )
}

renderUsers = () => {
    return(
        <Text>renderUsers</Text>
    )
}

renderCampuses = () => {
    return(
        <Text>renderCampuses</Text>
    )
}


  render() {
    console.log(this.state);
    return (
     <View>
          <View
        style={{
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            elevation:3, borderColor: "#d4cfc1"
        }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({selection: 'Feed'});
          }}>
          <View>
            <Text style={{
                fontSize: 15,
                color: this.state.selection === 'Feed' ? ThemeBlue : 'grey',
                borderBottomWidth: this.state.selection === 'Feed' ? 1 : 0,
                borderBottomColor: ThemeBlue,
                marginBottom:6,
                marginTop:8
              }}>Feed</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({selection: 'Users'});
          }}>
          <View>
            <Text style={{
                fontSize: 15,
                color: this.state.selection === 'Users' ? ThemeBlue : 'grey',
                borderBottomWidth: this.state.selection === 'Users' ? 1 : 0,
                borderBottomColor: ThemeBlue,
                marginBottom:6,
                marginTop:8
              }}>Users</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({selection: 'Campuses'});
          }}>
          <View>
            <Text
              style={{
                fontSize: 15,
                color: this.state.selection === 'Campuses' ? ThemeBlue : 'grey',
                borderBottomWidth: this.state.selection === 'Campuses' ? 1 : 0,
                borderBottomColor: ThemeBlue,
                marginBottom:6,
                marginTop:8
              }}>
              Campuses
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
          {this.state.selection === 'Feed' ? this.renderFeed() : null}
          {this.state.selection === 'Users' ? this.renderUsers() : null}
          {this.state.selection === 'Campuses' ? this.renderCampuses() : null}
      </ScrollView>
     </View>
    );
  }
}
