import React, {Component} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import IconFeather from 'react-native-vector-icons/Feather';

class LogoutButton extends Component {
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    await this.props.navigation.navigate('Login');
    console.log('Logged Out');
  };

  render() {
    console.log(this.props.navigation);
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 30, alignItems: 'center'}}
          onPress={this._signOutAsync}>
          <IconFeather
            name="log-out"
            color='white'
            style={{
              paddingLeft: '3%',
              fontSize: 30,
            }}></IconFeather>
          <Text style={this.props.style}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(LogoutButton);
