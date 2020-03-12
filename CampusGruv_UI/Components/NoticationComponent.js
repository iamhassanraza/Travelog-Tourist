import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {bkgdColor, primaryColor, greyColor} from '../Assets/Colors'

export default class NoticationComponent extends Component {
  render() {
    return (
      <View style={{ backgroundColor: this.props.unread ? '#E5E5E5' : 'white'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', width: '10%', marginRight: '2%'}}>
            <Avatar size="small" rounded source={{uri: this.props.uri}} />
          </View>

          <View style={{width: '86%', flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={{width:'90%', padding: 2, fontSize: 16}}>
                {' '}
                {this.props.activity}{' '}
              </Text>
              <Text style={{fontSize: 9, color: 'grey'}}>
                {' '}
                {this.props.time}
              </Text>
          </View>
        </View>
        <Divider style={{marginTop: '2.5%'}}></Divider>
      </View>
    );
  }
}
