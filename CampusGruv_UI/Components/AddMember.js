import React, {Component} from 'react';
import {Text, View,AsyncStorage} from 'react-native';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import FastImage from 'react-native-fast-image';
import {ThemeBlue} from '../Assets/Colors';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';


export default class AddMember extends Component {

    state={
        added : false,
    }


addMember = async () => {

    const Token = await AsyncStorage.getItem('TOKEN');

  
    if (!this.state.added) {
      Response = await fetch(
        `${
          require('../config').default.production
        }api/v1/organization/addmembers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
          body: JSON.stringify({
            member_id:this.props.id,
            organization_id: this.props.org_id
          }),
        },
      );
    } else {
      alert('Already Added');
    }
    const JsonResponse = await Response.json();
    if (parseInt(Response.status) === 400) {
      console.log('400');
      alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 200) {
        this.setState({added:true})
      console.log('200', JsonResponse);
    } else {
      alert('something is wrong');
    }
  };



  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '2%',
          paddingHorizontal: '2%',
        }}>
        <View style={{flex: 4}}>
          <View style={{flexDirection: 'row', padding: '1%'}}>
            <FastImage
              source={
                this.props.pic === '' || !this.props.pic
                  ? defaultAvatar
                  : {
                      uri: this.props.pic,
                    }
              }
              style={{height: 40, width: 40, borderRadius: 50}}
            />
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'grey',
                paddingLeft: '2%',
              }}>
             {this.props.first_name + ' ' + this.props.last_name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            //this.setState({follow: !this.state.follow});
            this.addMember();
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              flexDirection: 'row',
              height: 24,
              width: 62,
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: this.state.added ? ThemeBlue : 'grey',
            }}>
            <Text
              style={{
                color: this.state.added ? ThemeBlue : 'grey',
                fontSize: 11,
                fontWeight: 'bold',
              }}>
              {this.state.added ? 'Added' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
