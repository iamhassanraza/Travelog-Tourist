import React, {Component} from 'react';
import {Text, View,AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation';

 class LogoutButton extends Component {
 
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
        console.log('Logged Out')
      };
 
    render() {
    return (
      <View>
        <Text onPress={this._signOutAsync} style={this.props.style}> log Out</Text>
      </View>
    );
  }
}
export default withNavigation(LogoutButton)