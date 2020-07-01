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
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import {UIActivityIndicator, BarIndicator} from 'react-native-indicators';
import {ThemeBlue} from '../Assets/Colors';
import switchImg from '../Assets/Images/switch.png';

class UserSettings extends Component {
  state = {
    isModalVisible: false,
    selected: 'user',
  };

  async componentDidMount() {
    let Token = await AsyncStorage.getItem('USERTOKEN');
    let userId = await AsyncStorage.getItem('USER_ID');
    let selected = await AsyncStorage.getItem('selected');
    let accountType = await AsyncStorage.getItem('accountType');
    this.setState({accountType: accountType});
    if (accountType === 'user') {
      this.setState({selected: 'user'});
    } else {
      this.setState({selected: Number(selected)});
    }

    var userResponse = await fetch(
      `${
        require('../config').default.production
      }api/v1/get/user?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    let JsonResponse1 = await userResponse.json();
    this.setState({user: JsonResponse1});

    var response = await fetch(
      `${require('../config').default.production}api/v1/user/organizations`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    let JsonResponse = await response.json();
    this.setState({organizations: JsonResponse});
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{color: ThemeBlue}}
          customIndicator={<UIActivityIndicator color={ThemeBlue} />}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '3%',
            marginTop: '3%',
          }}>
          {this.state.user ? (
            <TouchableOpacity
              disabled={this.state.selected === 'user'}
              onPress={() => {
                this.setState({selected: 'user'}, async () => {
                  var USER = await AsyncStorage.getItem('USER_ID');
                  var userToken = await AsyncStorage.getItem('USERTOKEN');
                  var currentToken = await AsyncStorage.getItem('TOKEN');
                  console.log('socket', this.props.socket);

                  await this.props.socket.emit('account_switched');
                  var res = await fetch(
                    `${
                      require('../config').default.production
                    }api/v1/user/logout`,
                    {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentToken}`,
                      },
                    },
                  );
                  console.log('response', await res.json());
                  await AsyncStorage.setItem('TOKEN', userToken);
                  await AsyncStorage.setItem('selected', USER);
                  await AsyncStorage.setItem('accountType', 'user');
                  this.props.screenProps.rootNavigation.navigate('AuthLoading');
                });
                console.log('switch to main acount');
              }}
              style={{
                // width: 90,

                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <FastImage
                style={{
                  height: 50,
                  borderWidth: 2,
                  borderColor:
                    this.state.selected === 'user' ? 'black' : 'grey',
                  width: 50,
                  borderRadius: 50,
                }}
                source={{
                  uri: this.state.user ? this.state.user.profile_pic_url : '',
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  width: 60,
                  fontSize: 12,
                  marginTop: 2,
                  fontWeight: this.state.selected === 'user' ? '600' : 'normal',
                  color: this.state.selected === 'user' ? 'black' : 'grey',
                  textAlign: 'center',
                }}>
                {this.state.user
                  ? this.state.user.first_name + ' ' + this.state.user.last_name
                  : ''}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <UIActivityIndicator size={20} />
            </View>
          )}
          <FlatList
            style={{height: 70}}
            horizontal
            data={this.state.organizations}
            keyExtractor={item => item.orgName}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {selected: item.organizations.id, spinner: true},
                      async () => {
                        const Token = await AsyncStorage.getItem('USERTOKEN');
                        const currentToken = await AsyncStorage.getItem(
                          'TOKEN',
                        );
                        console.log('socket', this.props.socket);
                        await this.props.socket.emit('account_switched');
                        var res = await fetch(
                          `${
                            require('../config').default.production
                          }api/v1/user/logout`,
                          {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${currentToken}`,
                            },
                          },
                        );
                        console.log('response', await res.json());

                        var response = await fetch(
                          `${
                            require('../config').default.production
                          }api/v1/organization/token?organization_id=${
                            item.organizations.id
                          }`,
                          {
                            headers: {
                              Authorization: `Bearer ${Token}`,
                            },
                          },
                        );
                        const JsonResponse = await response.json();
                        await AsyncStorage.setItem(
                          'TOKEN',
                          JsonResponse.token.token,
                        );
                        this.setState({spinner: false});
                        await AsyncStorage.setItem(
                          'selected',
                          item.organizations.id.toString(),
                        );
                        await AsyncStorage.setItem('accountType', 'org');
                        this.props.screenProps.rootNavigation.navigate(
                          'AuthLoading',
                        );
                      },
                    );
                  }}>
                  <View style={{paddingHorizontal: 5, alignItems: 'center'}}>
                    <FastImage
                      source={{uri: item.organizations.profile_pic_url}}
                      style={{
                        height: 50,
                        borderWidth: 2,
                        borderColor:
                          this.state.selected === item.organizations.id
                            ? 'black'
                            : 'grey',
                        width: 50,
                        borderRadius: 50,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        textAlign: 'center',
                        marginTop: 2,
                        width: 60,
                        fontSize: 12,
                        fontWeight:
                          this.state.selected === item.organizations.id
                            ? '600'
                            : 'normal',

                        color:
                          this.state.selected === item.organizations.id
                            ? 'black'
                            : 'grey',
                      }}>
                      {item.organizations.first_name}
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
          {this.state.accountType !== 'org' ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CreateOrganization', null);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '2%',
                  marginTop: '3%',
                }}>
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
          ) : null}

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
                const Token = await AsyncStorage.getItem('TOKEN');

                var response = await fetch(
                  `${
                    require('../config').default.production
                  }api/v1/user/logout`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${Token}`,
                    },
                  },
                );
                console.log('response', await response.json());

                await AsyncStorage.clear();

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

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User, socket: state.socket}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  {CreateUserDetails},
)(UserSettings);
