import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      focused: false,
    };
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        {/* OPTIONS */}

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text
            style={{
              fontSize: this.props.fontSize ?? 20,
              marginTop: 15,
              marginLeft: '5%',
              width: this.props.width ?? '25%',
            }}>
            {this.props.name}
          </Text>
          <TextInput
            autoCapitalize="words"
            multiline={this.props.multiline}
            onFocus={() => {
              this.setState({focused: true});
            }}
            onBlur={() => {
              this.setState({focused: false});
            }}
            value={this.props.value}
            style={{
              width: '60%',
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 0.5,
              fontSize: 20,
            }}
            placeholder={this.props.ph}
            onChangeText={text => {
              this.setState({value: text});
              this.props.changestate(text);
            }}
          />
          <Icon
            name="pencil"
            color={this.state.focused ? '#0C91CF' : '#C4C4C4'}
            size={26}
            style={{width: '10%', marginTop: 15}}
          />
        </View>
      </View>
    );
  }
}

export default InputView;
