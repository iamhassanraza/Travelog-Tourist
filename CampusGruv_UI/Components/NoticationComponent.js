import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';

export default class NoticationComponent extends Component {
  render() {
    return (
      <View style={{paddingTop: '2%'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            paddingTop: '2%',
          }}>
          <View style={{flexDirection: 'row', width: '10%', marginRight: '2%'}}>
            <Avatar size="small" rounded source={{uri: this.props.uri}} />
          </View>

          <View style={{width: '86%', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text>
              {/* <Text
                style={{
                  marginLeft: '3%',
                  //color: 'grey',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {this.props.title}{' '}
              </Text> */}
              <Text style={{marginRight: '3%', fontSize: 16}}>
                {' '}
                {this.props.activity}{' '}
              </Text>
              <Text style={{fontSize: 9, color: 'grey'}}>
                {' '}
                {this.props.time}
              </Text>
            </Text>
          </View>
        </View>
        <Divider style={{marginTop: '2%'}}></Divider>
      </View>
    );
  }
}
