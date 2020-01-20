import React, {Component} from 'react';
import {Text, View,AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';


 class LogoutButton extends Component {
 
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
        console.log('Logged Out')
      };
 
    render() {
    return (
      <View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={this._signOutAsync}>
          <IconFeather
            name="log-out"
            style={{
              paddingLeft: '2%',
              fontSize: 30,
            }}
          >
          </IconFeather>
          <Text style={this.props.style}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(LogoutButton)