import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {bkgdColor, primaryColor, greyColor} from '../Assets/Colors';
import TimeAgo from 'react-native-timeago';
import {withNavigation} from 'react-navigation';

class NoticationComponent extends Component {
  render() {
    return (
      <View style={{backgroundColor: this.props.unread ? '#E5E5E5' : 'white'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('PostDetail');
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', width: '12%'}}>
            <Avatar size="small" rounded source={{uri: this.props.uri}} />
          </View>

          <View style={{width: '75%', flexDirection: 'row'}}>
            <Text style={{fontSize: 16}}>{this.props.activity} </Text>
          </View>
          <View style={{width: '13%'}}>
            <TimeAgo time={this.props.time} style={{fontSize: 8}} />
          </View>
        </TouchableOpacity>
        <Divider
          style={
            {
              //marginTop: '2.5%'
            }
          }></Divider>
      </View>
    );
  }
}

export default withNavigation(NoticationComponent);
