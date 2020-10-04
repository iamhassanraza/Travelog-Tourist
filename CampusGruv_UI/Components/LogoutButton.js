import React, {Component} from 'react';
import {Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import IconFeather from 'react-native-vector-icons/Feather';
import {ThemeBlue} from '../Assets/Colors';

class LogoutButton extends Component {
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    await this.props.navigation.navigate('Login');
    console.log('Logged Out');
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 30, alignItems: 'center'}}
          onPress={this._signOutAsync}>
          <IconFeather
            name="log-out"
            color={ThemeBlue}
            style={{
              paddingLeft: '3%',
              fontSize: 30,
            }}
          />
          <Text style={this.props.style}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(LogoutButton);
