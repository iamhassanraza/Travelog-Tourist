import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import {withNavigation} from 'react-navigation'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';

class AvatarUserStatus extends Component {
  state = {
    follow: this.props.status,
  };

  render() {
   
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.push('UserProfile', {
            id: this.props.id
        })}  
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '1%'
            // paddingBottom: '2%',
            // paddingTop: '2%',
            // paddingLeft: '2%',
            // paddingRight: '2%',
          }}
        >
        <View style={{flexDirection: 'row', padding: '1%', flex: 4}}>
          <Image
            source={{uri : this.props.pic}}
            style={{height: 40, width: 40, borderRadius: 50}}>
          </Image>
          <Text style={{fontSize: 18,alignSelf: 'center', fontWeight: 'bold', color: 'grey', paddingLeft:"2%"}}>
          {this.props.name}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({follow: !this.state.follow});
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              flexDirection: 'row',
              height: 27,
              width: 62,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              borderColor: this.state.follow ? ThemeBlue : 'grey',
            }}>
            <Text
              style={{
                color: this.state.follow ? ThemeBlue : 'grey',
                fontSize: 12,
              }}>
              {this.state.follow ? 'Following' : 'Follow'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(AvatarUserStatus)
