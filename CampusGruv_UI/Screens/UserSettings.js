import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/SimpleLineIcons';
import i1 from '../Assets/Images/lahore.jpg';
import i2 from '../Assets/Images/book.jpg';
import i3 from '../Assets/Images/ema.jpg';
import AccPic from '../Components/MultipleAccountsPic';
import Modal from 'react-native-modal';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import LogoutButton from '../Components/LogoutButton';
import {NavigationActions} from 'react-navigation';
import FastImage from 'react-native-fast-image';

export default class UserSettings extends Component {
  state = {
    isModalVisible: false,
    accounts: [
      {pic: i1, orgName: 'Students'},
      {pic: i2, orgName: 'Teachers Council'},
      {pic: i3, orgName: 'Outsiders'},
    ],
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
        <View
          style={{
            marginLeft: '3%',
            marginTop: '3%',
          }}>
          {/* <AccPic img={i1} />
          <AccPic img={i2} />
          <AccPic img={i3} /> */}

          <FlatList
            horizontal
            data={this.state.accounts}
            keyExtractor={item => item.orgName}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <View style={{paddingHorizontal: 3, alignItems: 'center'}}>
                    <FastImage
                      source={item.pic}
                      style={{height: 40, width: 40, borderRadius: 50}}
                    />
                    <Text style={{fontSize: 12, color: 'grey'}}>
                      {item.orgName}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View>
          {/* <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="account-circle-outline"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: -1,
                fontSize: 35,
              }}
            />
            <Text
              style={{
                flex: 8,
                alignSelf: 'center',
                fontSize: 19,
                paddingLeft: '2%',
              }}>
              Account
            </Text>
          </View> */}

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CreateOrganization', null);
            }}>
            <View
              style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
              <IconFeather
                name="users"
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  paddingLeft: '2%',
                  fontSize: 30,
                }}
              />
              <Text
                style={{
                  flex: 8,
                  alignSelf: 'center',
                  fontSize: 19,
                }}>
                Create Organization Account
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="bell-outline"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 35,
              }}
            />
            <Text style={{flex: 8, alignSelf: 'center', fontSize: 19}}>
              Notifications
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="help-circle-outline"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 35,
              }}
            />
            <Text style={{flex: 8, alignSelf: 'center', fontSize: 19}}>
              Help & Support
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <IconFeather
              name="info"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 35,
              }}
            />
            <Text style={{flex: 8, alignSelf: 'center', fontSize: 19}}>
              About
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            height: 50,
            left: 10,
            bottom: 10,
            justifyContent: 'center',
          }}>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={async () => {
                await AsyncStorage.clear();
                var response = await fetch(
                  `${
                    require('../config').default.production
                  }api/v1/user/update/fcm`,
                  {
                    method: 'POST',
                    body: JSON.stringify({
                      fcm_token: null,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userToken}`,
                    },
                  },
                );
                console.log('response', await response.json());

                this.props.screenProps.rootNavigation.navigate('Login');
              }}>
              <IconFeather
                name="log-out"
                style={{
                  paddingLeft: '2%',
                  fontSize: 30,
                }}
              />
              <Text style={{fontSize: 19, paddingLeft: 5, paddingRight: 5}}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
