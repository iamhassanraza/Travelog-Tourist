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

const {width, height} = Dimensions.get('window');

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

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 15,
              marginLeft: 10,
              width: width / 3.1,
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
              width: width / 1.8,
              // marginLeft: '5%',
              paddingBottom: 1,
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
            style={{
              width: width / 10,
              marginLeft: '1%',
              marginTop: 15,
            }}
          />
        </View>
      </View>
    );
  }
}

export default InputView;
